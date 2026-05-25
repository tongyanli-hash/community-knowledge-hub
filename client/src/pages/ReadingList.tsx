/*
 * DESIGN SYSTEM: Modern Clean
 * Reading List page: Left filter panel + right book list
 * Part numbers as large watermarks, category chips, book cards
 */

import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { readingListParts, totalBookCount, type Part, type Book } from "@/data/readingList";
import { domains } from "@/data/domains";
import { Search, BookOpen, ChevronDown, ChevronRight, Filter, X, Database, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

const READING_LIST_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663273273644/HCJmvRPNXzYHmA4mt7a4Uy/hero-warm-7g5yWi57oSXZMKxAL35BZM.webp";

// Part roman numerals for display
const partNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

function BookCard({ book, index }: { book: Book; index: number }) {
  return (
    <div
      className="group flex items-start gap-4 py-4 border-b border-border last:border-b-0 hover:bg-[oklch(0.51_0.22_264)]/[0.03] transition-colors duration-150 px-4 -mx-4 rounded-sm animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      {/* Book number */}
      <span className="font-mono-custom text-xs text-muted-foreground/60 w-6 shrink-0 pt-0.5 text-right">
        {index + 1}
      </span>
      {/* Book icon */}
      <div className="w-8 h-8 bg-[oklch(0.51_0.22_264)]/10 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-[oklch(0.51_0.22_264)]/20 transition-colors">
        <BookOpen size={14} className="text-[oklch(0.51_0.22_264)]" />
      </div>
      {/* Book info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-snug">{book.title}</p>
        {book.author && (
          <p className="font-mono-custom text-xs text-muted-foreground mt-0.5">{book.author}</p>
        )}
      </div>
    </div>
  );
}

function CategorySection({ name, books, globalOffset }: { name: string; books: Book[]; globalOffset: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="category-chip">{name}</span>
        <span className="font-mono-custom text-xs text-muted-foreground">{books.length} books</span>
      </div>
      <div>
        {books.map((book, i) => (
          <BookCard key={i} book={book} index={globalOffset + i} />
        ))}
      </div>
    </div>
  );
}

function PartSection({ part, partIndex, isVisible }: { part: Part; partIndex: number; isVisible: boolean }) {
  if (!isVisible) return null;

  let globalOffset = 0;
  for (let i = 0; i < partIndex; i++) {
    globalOffset += readingListParts[i].totalBooks;
  }

  // Find domains that reference this part
  const relatedDomains = domains.filter(
    (d) => d.status === "active" && d.relatedReadingListParts.some((rp) => part.shortName.includes(rp) || rp.includes(part.shortName))
  );

  return (
    <div className="mb-16">
      {/* Part header with watermark */}
      <div className="relative mb-8 pb-4 border-b-2 border-[oklch(0.51_0.22_264)]">
        <div className="absolute right-0 top-0 part-number-watermark select-none pointer-events-none">
          {partNumerals[partIndex]}
        </div>
        <div className="relative">
          <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[oklch(0.51_0.22_264)] block mb-1">
            Part {partNumerals[partIndex]}
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            {part.shortName}
          </h2>
          <p className="font-mono-custom text-xs text-muted-foreground mt-2">
            {part.totalBooks} books · {part.categories.length} categories
          </p>
        </div>
      </div>

      {/* Related Domain callout */}
      {relatedDomains.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {relatedDomains.map((domain) => (
            <Link key={domain.id} href={`/domains/${domain.slug}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-medium transition-all hover:shadow-sm" style={{ borderColor: `${domain.color}40`, background: `${domain.color}08`, color: domain.color }}>
                <Database size={11} />
                <span>Related Domain: {domain.title}</span>
                <ArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Categories */}
      {part.categories.map((cat, ci) => {
        const catOffset = globalOffset + part.categories.slice(0, ci).reduce((sum, c) => sum + c.books.length, 0);
        return (
          <CategorySection key={ci} name={cat.name} books={cat.books} globalOffset={catOffset} />
        );
      })}
    </div>
  );
}

export default function ReadingList() {
  const [search, setSearch] = useState("");
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set(["part-1"]));
  const [filterOpen, setFilterOpen] = useState(false);

  const togglePart = (id: string) => {
    setExpandedParts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter books by search
  const filteredParts = useMemo(() => {
    if (!search.trim() && !selectedPart) return readingListParts;
    return readingListParts
      .filter(p => !selectedPart || p.id === selectedPart)
      .map(part => ({
        ...part,
        categories: part.categories
          .map(cat => ({
            ...cat,
            books: cat.books.filter(b =>
              !search.trim() ||
              b.title.toLowerCase().includes(search.toLowerCase()) ||
              b.author.toLowerCase().includes(search.toLowerCase()) ||
              b.category.toLowerCase().includes(search.toLowerCase())
            ),
          }))
          .filter(cat => cat.books.length > 0),
      }))
      .filter(p => p.categories.length > 0);
  }, [search, selectedPart]);

  const filteredCount = filteredParts.reduce((sum, p) => sum + p.totalBooks, 0);

  return (
    <Layout>
      {/* Page Header with image */}
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <img src={READING_LIST_IMG} alt="Reading list" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.02_264)]/90 to-[oklch(0.13_0.02_264)]/60" />
        <div className="relative h-full flex flex-col justify-end px-8 pb-8">
          <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/50 mb-2">Curated Collection</span>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white">Reading List</h1>
          <p className="text-white/60 text-sm mt-2">
            {totalBookCount} books across 8 domains of business knowledge
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Filter Sidebar */}
        <aside className={cn(
          "w-64 shrink-0 border-r border-border bg-[oklch(0.99_0.002_80)] sticky top-0 h-screen overflow-y-auto",
          "hidden lg:block"
        )}>
          <div className="p-5">
            {/* Search */}
            <div className="relative mb-5">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-[oklch(0.51_0.22_264)] focus:border-[oklch(0.51_0.22_264)] placeholder:text-muted-foreground/60"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* All Parts */}
            <div className="mb-3">
              <button
                onClick={() => setSelectedPart(null)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-150",
                  !selectedPart
                    ? "bg-[oklch(0.51_0.22_264)] text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                All Parts
                <span className="ml-auto float-right font-mono-custom text-xs opacity-70">{totalBookCount}</span>
              </button>
            </div>

          {/* Knowledge Domains quick links */}
          <div className="mb-5 pt-4 border-t border-border">
            <p className="font-mono-custom text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Knowledge Domains</p>
            {domains.filter(d => d.status === "active").map((domain) => (
              <Link key={domain.id} href={`/domains/${domain.slug}`}>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-sm text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mb-0.5">
                  <Database size={11} style={{ color: domain.color }} />
                  <span>{domain.title}</span>
                  <ArrowRight size={9} className="ml-auto opacity-40" />
                </div>
              </Link>
            ))}
          </div>

          {/* Part filters */}
          <div className="space-y-0.5">
            {readingListParts.map((part, i) => (
                <div key={part.id}>
                  <button
                    onClick={() => {
                      setSelectedPart(selectedPart === part.id ? null : part.id);
                      togglePart(part.id);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-sm text-sm transition-colors duration-150 flex items-center gap-2",
                      selectedPart === part.id
                        ? "bg-[oklch(0.51_0.22_264)]/10 text-[oklch(0.51_0.22_264)] font-semibold border-l-2 border-[oklch(0.51_0.22_264)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="font-mono-custom text-[10px] w-5 text-center opacity-60">{partNumerals[i]}</span>
                    <span className="flex-1 truncate text-xs">{part.shortName}</span>
                    <span className="font-mono-custom text-[10px] opacity-50 shrink-0">{part.totalBooks}</span>
                  </button>

                  {/* Category sub-items */}
                  {(selectedPart === part.id || expandedParts.has(part.id)) && selectedPart === part.id && (
                    <div className="ml-5 mt-0.5 space-y-0.5 mb-1">
                      {part.categories.map((cat, ci) => (
                        <div key={ci} className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground">
                          <span className="w-1 h-1 rounded-full bg-[oklch(0.51_0.22_264)]/40 shrink-0" />
                          <span className="truncate">{cat.name}</span>
                          <span className="font-mono-custom text-[10px] ml-auto opacity-50">{cat.books.length}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-30">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-[oklch(0.51_0.22_264)] text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-semibold"
          >
            <Filter size={14} />
            Filter
          </button>
        </div>

        {/* Book List */}
        <div className="flex-1 px-6 lg:px-10 py-8 min-w-0">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono-custom text-xs text-muted-foreground uppercase tracking-widest">
                {search || selectedPart ? `${filteredCount} results` : `${totalBookCount} books total`}
              </span>
              {(search || selectedPart) && (
                <button
                  onClick={() => { setSearch(""); setSelectedPart(null); }}
                  className="ml-3 text-xs text-[oklch(0.51_0.22_264)] hover:underline font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Parts */}
          {filteredParts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={40} className="text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No books found</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            filteredParts.map((part, i) => {
              const originalIndex = readingListParts.findIndex(p => p.id === part.id);
              return (
                <PartSection
                  key={part.id}
                  part={part}
                  partIndex={originalIndex}
                  isVisible={true}
                />
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
