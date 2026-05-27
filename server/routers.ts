import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  getReadingHistory,
  upsertReadingStatus,
  removeReadingStatus,
  getBookmarks,
  toggleBookmark,
} from "./db";
import {
  recommendBooks,
  rateLimitOk,
  isConfigured,
  RecommenderError,
  MAX_QUERY_LENGTH,
} from "./bookRecommender";

function clientIp(req: { headers: Record<string, unknown>; ip?: string; socket?: { remoteAddress?: string } }): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || "unknown";
}

export const appRouter = router({
  system: systemRouter,

  // ─── AI book recommender (public, landing page) ──────────────────────────
  recommend: router({
    /** Recommend books from the catalog based on a reader's mood / intent. */
    books: publicProcedure
      .input(z.object({ query: z.string().trim().min(1).max(MAX_QUERY_LENGTH) }))
      .mutation(async ({ input, ctx }) => {
        if (!isConfigured()) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "The recommender isn't configured yet (missing API key).",
          });
        }
        if (!rateLimitOk(clientIp(ctx.req))) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You're going a bit fast — please wait a moment and try again.",
          });
        }
        try {
          const recommendations = await recommendBooks(input.query);
          return { recommendations };
        } catch (err) {
          if (err instanceof RecommenderError) {
            throw new TRPCError({
              code: err.kind === "rate_limit" ? "TOO_MANY_REQUESTS" : "INTERNAL_SERVER_ERROR",
              message: err.message,
            });
          }
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "The reading guide is temporarily unavailable. Please try again later.",
          });
        }
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Reading History ────────────────────────────────────────────────────
  reading: router({
    /** Get all reading history entries for the current user */
    list: protectedProcedure.query(async ({ ctx }) => {
      return getReadingHistory(ctx.user.id);
    }),

    /** Set or update the reading status for a book */
    setStatus: protectedProcedure
      .input(z.object({
        bookKey: z.string(),
        status: z.enum(["want_to_read", "reading", "completed"]),
        bookTitle: z.string(),
        bookAuthor: z.string().optional(),
        partName: z.string().optional(),
        categoryName: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await upsertReadingStatus(ctx.user.id, input.bookKey, input.status, {
          bookTitle: input.bookTitle,
          bookAuthor: input.bookAuthor,
          partName: input.partName,
          categoryName: input.categoryName,
        });
        return { success: true };
      }),

    /** Remove a reading status entry (unmark a book) */
    removeStatus: protectedProcedure
      .input(z.object({ bookKey: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await removeReadingStatus(ctx.user.id, input.bookKey);
        return { success: true };
      }),
  }),

  // ─── Bookmarks ──────────────────────────────────────────────────────────
  bookmarks: router({
    /** Get all bookmarks for the current user */
    list: protectedProcedure.query(async ({ ctx }) => {
      return getBookmarks(ctx.user.id);
    }),

    /** Toggle a bookmark on/off for a resource */
    toggle: protectedProcedure
      .input(z.object({
        resourceKey: z.string(),
        resourceTitle: z.string(),
        resourceType: z.string().optional(),
        resourceUrl: z.string().optional(),
        domainId: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return toggleBookmark(ctx.user.id, input.resourceKey, {
          resourceTitle: input.resourceTitle,
          resourceType: input.resourceType,
          resourceUrl: input.resourceUrl,
          domainId: input.domainId,
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
