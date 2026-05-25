import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/mysql2";
import { account, session, user, verification } from "../drizzle/auth-schema";

// Dedicated drizzle instance for better-auth (uses the same local MySQL).
const db = drizzle(
  process.env.DATABASE_URL ||
    "mysql://root@localhost:3306/community_knowledge_hub"
);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: { user, session, account, verification },
  }),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
