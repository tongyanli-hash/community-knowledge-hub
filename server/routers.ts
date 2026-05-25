import { z } from "zod";
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

export const appRouter = router({
  system: systemRouter,

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
