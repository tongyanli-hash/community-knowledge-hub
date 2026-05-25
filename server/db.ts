import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, bookmarks, readingHistory, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Reading History helpers ───────────────────────────────────────────────

export async function getReadingHistory(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(readingHistory)
    .where(eq(readingHistory.userId, userId))
    .orderBy(desc(readingHistory.updatedAt));
}

export async function upsertReadingStatus(
  userId: number,
  bookKey: string,
  status: "want_to_read" | "reading" | "completed",
  meta: { bookTitle: string; bookAuthor?: string; partName?: string; categoryName?: string }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select().from(readingHistory)
    .where(and(eq(readingHistory.userId, userId), eq(readingHistory.bookKey, bookKey)))
    .limit(1);

  if (existing.length > 0) {
    await db.update(readingHistory)
      .set({ status, updatedAt: new Date() })
      .where(and(eq(readingHistory.userId, userId), eq(readingHistory.bookKey, bookKey)));
  } else {
    await db.insert(readingHistory).values({
      userId,
      bookKey,
      status,
      bookTitle: meta.bookTitle,
      bookAuthor: meta.bookAuthor ?? null,
      partName: meta.partName ?? null,
      categoryName: meta.categoryName ?? null,
    });
  }
}

export async function removeReadingStatus(userId: number, bookKey: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(readingHistory)
    .where(and(eq(readingHistory.userId, userId), eq(readingHistory.bookKey, bookKey)));
}

// ─── Bookmarks helpers ─────────────────────────────────────────────────────

export async function getBookmarks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookmarks)
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));
}

export async function toggleBookmark(
  userId: number,
  resourceKey: string,
  meta: { resourceTitle: string; resourceType?: string; resourceUrl?: string; domainId?: string }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select().from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.resourceKey, resourceKey)))
    .limit(1);

  if (existing.length > 0) {
    await db.delete(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.resourceKey, resourceKey)));
    return { bookmarked: false };
  } else {
    await db.insert(bookmarks).values({
      userId,
      resourceKey,
      resourceTitle: meta.resourceTitle,
      resourceType: meta.resourceType ?? null,
      resourceUrl: meta.resourceUrl ?? null,
      domainId: meta.domainId ?? null,
    });
    return { bookmarked: true };
  }
}
