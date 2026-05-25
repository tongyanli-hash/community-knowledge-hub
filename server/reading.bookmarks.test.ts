import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module so tests don't need a real database
vi.mock("./db", () => ({
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getReadingHistory: vi.fn().mockResolvedValue([]),
  upsertReadingStatus: vi.fn().mockResolvedValue(undefined),
  removeReadingStatus: vi.fn().mockResolvedValue(undefined),
  getBookmarks: vi.fn().mockResolvedValue([]),
  toggleBookmark: vi.fn().mockResolvedValue({ bookmarked: true }),
}));

import * as db from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-openid",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAnonContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("reading.list", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns reading history for authenticated user", async () => {
    const mockHistory = [
      { id: 1, userId: 1, bookKey: "book-1", bookTitle: "Test Book", partName: "Part I", categoryName: "Category A", status: "reading", createdAt: new Date(), updatedAt: new Date() },
    ];
    vi.mocked(db.getReadingHistory).mockResolvedValueOnce(mockHistory as any);

    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reading.list();

    expect(result).toEqual(mockHistory);
    expect(db.getReadingHistory).toHaveBeenCalledWith(1);
  });

  it("throws UNAUTHORIZED for unauthenticated user", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.reading.list()).rejects.toThrow();
  });
});

describe("reading.setStatus", () => {
  beforeEach(() => vi.clearAllMocks());

  it("sets reading status for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.reading.setStatus({
      bookKey: "book-5",
      bookTitle: "经济学原理",
      partName: "经济学和大势",
      categoryName: "教材类",
      status: "completed",
    });

    expect(result).toEqual({ success: true });
    expect(db.upsertReadingStatus).toHaveBeenCalledWith(
      1,
      "book-5",
      "completed",
      expect.objectContaining({ bookTitle: "经济学原理" })
    );
  });

  it("rejects invalid status values", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.reading.setStatus({
        bookKey: "book-5",
        bookTitle: "Test",
        partName: "Part I",
        categoryName: "Cat",
        status: "invalid_status" as any,
      })
    ).rejects.toThrow();
  });

  it("throws UNAUTHORIZED for unauthenticated user", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.reading.setStatus({ bookKey: "book-1", bookTitle: "T", partName: "P", categoryName: "C", status: "reading" })
    ).rejects.toThrow();
  });
});

describe("reading.removeStatus", () => {
  beforeEach(() => vi.clearAllMocks());

  it("removes reading status for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.reading.removeStatus({ bookKey: "book-5" });

    expect(result).toEqual({ success: true });
    expect(db.removeReadingStatus).toHaveBeenCalledWith(1, "book-5");
  });
});

describe("bookmarks.list", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns bookmarks for authenticated user", async () => {
    const mockBookmarks = [
      { id: 1, userId: 1, itemKey: "resource-1", itemTitle: "Apache Kafka", itemType: "resource", itemUrl: "https://kafka.apache.org", createdAt: new Date() },
    ];
    vi.mocked(db.getBookmarks).mockResolvedValueOnce(mockBookmarks as any);

    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bookmarks.list();

    expect(result).toEqual(mockBookmarks);
    expect(db.getBookmarks).toHaveBeenCalledWith(1);
  });

  it("throws UNAUTHORIZED for unauthenticated user", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.bookmarks.list()).rejects.toThrow();
  });
});

describe("bookmarks.toggle", () => {
  beforeEach(() => vi.clearAllMocks());

  it("adds a bookmark when not already bookmarked", async () => {
    vi.mocked(db.toggleBookmark).mockResolvedValueOnce({ bookmarked: true });

    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bookmarks.toggle({
      resourceKey: "resource-1",
      resourceTitle: "Apache Kafka",
    });

    expect(result).toEqual({ bookmarked: true });
    expect(db.toggleBookmark).toHaveBeenCalledWith(1, "resource-1", expect.objectContaining({ resourceTitle: "Apache Kafka" }));
  });

  it("removes a bookmark when already bookmarked", async () => {
    vi.mocked(db.toggleBookmark).mockResolvedValueOnce({ bookmarked: false });

    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.bookmarks.toggle({
      resourceKey: "resource-1",
      resourceTitle: "Apache Kafka",
    });

    expect(result).toEqual({ bookmarked: false });
    expect(db.toggleBookmark).toHaveBeenCalledWith(1, "resource-1", expect.objectContaining({ resourceTitle: "Apache Kafka" }));
  });
});
