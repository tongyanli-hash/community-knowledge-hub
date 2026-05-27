import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Sparkles, ArrowRight, Loader2, BookOpen } from "lucide-react";

const EXAMPLES = [
  "I want to understand the macro economy",
  "Feeling stuck as a first-time founder",
  "How do great products get built?",
  "想学习市场营销和品牌定位",
];

const MAX_LEN = 500;

export default function BookRecommender() {
  const [query, setQuery] = useState("");
  const reco = trpc.recommend.books.useMutation();

  const submit = (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length === 0 || reco.isPending) return;
    setQuery(trimmed);
    reco.mutate({ query: trimmed.slice(0, MAX_LEN) });
  };

  const results = reco.data?.recommendations ?? [];
  const showEmpty = reco.isSuccess && results.length === 0;

  return (
    <section className="py-16 px-8 lg:px-16 bg-[oklch(0.965_0.003_264)]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 font-mono-custom text-xs tracking-[0.2em] uppercase text-[oklch(0.51_0.22_264)] mb-3">
            <Sparkles size={14} /> AI Reading Guide
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
            Not sure where to start?
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
            Tell us how you're feeling or what you want to learn — we'll suggest books from the reading list.
          </p>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            submit(query);
          }}
          className="relative"
        >
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value.slice(0, MAX_LEN))}
            placeholder="e.g. I want to learn how to position a new product…"
            rows={3}
            maxLength={MAX_LEN}
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm focus:border-[oklch(0.51_0.22_264)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.51_0.22_264)]/20"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="font-mono-custom text-[10px] text-muted-foreground">
              {query.length}/{MAX_LEN}
            </span>
            <button
              type="submit"
              disabled={reco.isPending || query.trim().length === 0}
              className="flex items-center gap-2 bg-[oklch(0.51_0.22_264)] hover:bg-[oklch(0.44_0.20_264)] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors"
            >
              {reco.isPending ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Finding books…
                </>
              ) : (
                <>
                  <Sparkles size={15} /> Recommend books
                </>
              )}
            </button>
          </div>
        </form>

        {/* Example prompts */}
        {!reco.data && !reco.isPending && (
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {EXAMPLES.map(ex => (
              <button
                key={ex}
                onClick={() => submit(ex)}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-[oklch(0.51_0.22_264)]/40 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {reco.error && (
          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {reco.error.message}
          </div>
        )}

        {/* Off-topic / no matches */}
        {showEmpty && (
          <div className="mt-6 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground text-center">
            Hmm, I couldn't match that to the reading list. Try describing a mood or a topic you'd like to learn about.
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 space-y-3">
            <p className="font-mono-custom text-[10px] uppercase tracking-widest text-muted-foreground">
              Suggested for you
            </p>
            {results.map(book => (
              <div
                key={book.id}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 hover:border-[oklch(0.51_0.22_264)]/50 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[oklch(0.51_0.22_264)]/10 flex items-center justify-center">
                  <BookOpen size={16} className="text-[oklch(0.51_0.22_264)]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {book.title}
                    {book.author && (
                      <span className="font-normal text-muted-foreground"> · {book.author}</span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-snug">{book.reason}</p>
                  <span className="font-mono-custom text-[10px] text-muted-foreground/70 mt-1.5 block">
                    {book.category} · {book.part}
                  </span>
                </div>
              </div>
            ))}
            <Link href="/reading-list">
              <button className="flex items-center gap-1.5 text-[oklch(0.51_0.22_264)] text-sm font-semibold hover:gap-2.5 transition-all mt-2">
                Browse the full reading list <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
