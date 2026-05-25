# Community Knowledge Hub — TODO

## Membership System

- [x] Update drizzle schema: add readingHistory and bookmarks tables
- [x] Run pnpm db:push to migrate schema
- [x] Add server/db.ts helpers for reading history and bookmarks
- [x] Add tRPC routers for reading history (set/get/delete) and bookmarks (toggle/list)
- [x] Update Layout.tsx to show user avatar + sign-in button in sidebar footer
- [x] Create Profile page (reading stats, history, bookmarks)
- [x] Add route /profile to App.tsx
- [x] Integrate reading status buttons into ReadingList page (Want to Read / Reading / Done)
- [ ] Integrate bookmark toggle into Resources page
- [ ] Add reading progress bar per Part in ReadingList sidebar
- [x] Write vitest tests for reading history and bookmarks procedures
