import { createAuthClient } from "better-auth/react";

// Same-origin: the API is served at /api/auth on this dev server.
export const authClient = createAuthClient({
  baseURL: window.location.origin,
});
