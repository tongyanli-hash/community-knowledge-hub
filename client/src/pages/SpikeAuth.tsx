import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * better-auth spike page (local independence test).
 * Real email/password sign-up + sign-in against local MySQL — no Manus OAuth.
 * Visit /spike-auth.
 */
export default function SpikeAuth() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("Spike Tester");
  const [email, setEmail] = useState("spike@example.com");
  const [password, setPassword] = useState("password1234");
  const [msg, setMsg] = useState("");

  const run = async (fn: () => Promise<{ error?: { message?: string } | null }>, label: string) => {
    setMsg(`${label}…`);
    try {
      const { error } = await fn();
      setMsg(error ? `❌ ${label} failed: ${error.message}` : `✅ ${label} ok`);
    } catch (e) {
      setMsg(`❌ ${label} threw: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "48px auto", fontFamily: "system-ui", padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>better-auth spike</h1>
      <p style={{ color: "#666", fontSize: 13, marginBottom: 20 }}>
        Real email/password auth against local MySQL. No Manus required.
      </p>

      <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
        <input placeholder="name" value={name} onChange={e => setName(e.target.value)}
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }} />
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)}
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }} />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => run(() => authClient.signUp.email({ name, email, password }), "Sign up")}
          style={btn}>Sign up</button>
        <button onClick={() => run(() => authClient.signIn.email({ email, password }), "Sign in")}
          style={btn}>Sign in</button>
        <button onClick={() => run(() => authClient.signOut(), "Sign out")}
          style={{ ...btn, background: "#eee", color: "#333" }}>Sign out</button>
      </div>

      {msg && <div style={{ fontSize: 13, marginBottom: 16 }}>{msg}</div>}

      <div style={{ background: "#f6f6f6", borderRadius: 8, padding: 12, fontSize: 12 }}>
        <strong>Current session</strong>
        <pre style={{ whiteSpace: "pre-wrap", margin: "8px 0 0" }}>
          {isPending ? "loading…" : JSON.stringify(session, null, 2) || "null"}
        </pre>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "8px 14px", background: "#4f46e5", color: "white",
  border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14,
};
