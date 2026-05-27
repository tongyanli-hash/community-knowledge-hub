/*
 * DESIGN SYSTEM: Modern Clean
 * Reading List page: Left filter panel + right book list
 * Part numbers as large watermarks, category chips, book cards with reading status
 */

import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { readingListParts, totalBookCount, type Part, type Book } from "@/data/readingList";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Search, BookOpen, Filter, X,
  CheckCircle2, Clock, BookMarked, ChevronDown, LogIn
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { toast } from "sonner";

const READING_LIST_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663273273644/HCJmvRPNXzYHmA4mt7a4Uy/hero-warm-7g5yWi57oSXZMKxAL35BZM.webp";

const partNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

type ReadingStatus = "want_to_read" | "reading" | "completed";

const STATUS_CONFIG: Record<ReadingStatus, { label: string; icon: typeof CheckCircle2; color: string; bg: string; activeBg: string }> = {
  want_to_read: { label: "Want to Read", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", activeBg: "bg-blue-100 border-blue-300" },
  reading: { label: "Reading", icon: BookMarked, color: "text-amber-600", bg: "bg-amber-50", activeBg: "bg-amber-100 border-amber-300" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", activeBg: "bg-emerald-100 border-emerald-300" },
};

function BookStatusButton({
  bookKey,
  bookTitle,
  partName,
  categoryName,
  currentStatus,
  onStatusChange,
}: {
  bookKey: string;
  bookTitle: string;
  partName: string;
  categoryName: string;
  currentStatus?: ReadingStatus;
  onStatusChange: (key: string, status: ReadingStatus | null) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (status: ReadingStatus) => {
    if (currentStatus === status) {
      onStatusChange(bookKey, null); // toggle off
    } else {
      onStatusChange(bookKey, status);
    }
    setOpen(false);
  };

  if (currentStatus) {
    const cfg = STATUS_CONFIG[currentStatus];
    const Icon = cfg.icon;
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px] font-medium transition-all",
            cfg.activeBg, cfg.color
          )}
        >
          <Icon size={11} />
          <span className="hidden sm:inline">{cfg.label}</span>
          <ChevronDown size={9} />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
            {(Object.entries(STATUS_CONFIG) as [ReadingStatus, typeof STATUS_CONFIG[ReadingStatus]][]).map(([s, c]) => {
              const SIcon = c.icon;
              return (
                <button
                  key={s}
                  onClick={() => handleSelect(s)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted transition-colors",
                    s === currentStatus ? cn(c.color, "font-semibold") : "text-foreground"
                  )}
                >
                  <SIcon size={12} className={s === currentStatus ? c.color : "text-muted-foreground"} />
                  {c.label}
                  {s === currentStatus && <span className="ml-auto text-[10px] text-muted-foreground">✓</span>}
                </button>
              );
            })}
            <div className="border-t border-border mt-1 pt-1">
              <button
                onClick={() => { onStatusChange(bookKey, null); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
              >
                <X size={12} />
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-[oklch(0.51_0.22_264)]/50 hover:bg-[oklch(0.51_0.22_264)]/5 transition-all opacity-0 group-hover:opacity-100"
      >
        <BookOpen size={11} />
        <span className="hidden sm:inline">Track</span>
        <ChevronDown size={9} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-border rounded-lg shadow-lg py-1 min-w-[140px]">
          {(Object.entries(STATUS_CONFIG) as [ReadingStatus, typeof STATUS_CONFIG[ReadingStatus]][]).map(([s, c]) => {
            const SIcon = c.icon;
            return (
              <button
                key={s}
                onClick={() => handleSelect(s)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
              >
                <SIcon size={12} className={c.color} />
                {c.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BookCard({
  book,
  index,
  partName,
  categoryName,
  statusMap,
  onStatusChange,
  isAuthenticated,
}: {
  book: Book;
  index: number;
  partName: string;
  categoryName: string;
  statusMap: Record<string, ReadingStatus>;
  onStatusChange: (key: string, status: ReadingStatus | null) => void;
  isAuthenticated: boolean;
}) {
  const bookKey = `book-${book.book}`;
  const currentStatus = statusMap[bookKey];

  return (
    <div
      className="group flex items-center gap-4 py-3.5 border-b border-border last:border-b-0 hover:bg-[oklch(0.51_0.22_264)]/[0.03] transition-colors duration-150 px-4 -mx-4 rounded-sm animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <span className="font-mono-custom text-xs text-muted-foreground/60 w-6 shrink-0 text-right">
        {book.book}
      </span>
      <div className={cn(
        "w-8 h-8 rounded-sm flex items-center justify-center shrink-0 transition-colors",
        currentStatus === "completed"
          ? "bg-emerald-100"
          : currentStatus === "reading"
          ? "bg-amber-100"
          : currentStatus === "want_to_read"
          ? "bg-blue-100"
          : "bg-[oklch(0.51_0.22_264)]/10 group-hover:bg-[oklch(0.51_0.22_264)]/20"
      )}>
        {currentStatus === "completed" ? (
          <CheckCircle2 size={14} className="text-emerald-600" />
        ) : currentStatus === "reading" ? (
          <BookMarked size={14} className="text-amber-600" />
        ) : currentStatus === "want_to_read" ? (
          <Clock size={14} className="text-blue-600" />
        ) : (
          <BookOpen size={14} className="text-[oklch(0.51_0.22_264)]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-snug">{book.title}</p>
        {book.author && (
          <p className="font-mono-custom text-xs text-muted-foreground mt-0.5">{book.author}</p>
        )}
      </div>
      {isAuthenticated ? (
        <BookStatusButton
          bookKey={bookKey}
          bookTitle={book.title}
          partName={partName}
          categoryName={categoryName}
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
        />
      ) : (
        <a href={getLoginUrl()} className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border text-[11px] text-muted-foreground hover:text-foreground hover:border-[oklch(0.51_0.22_264)]/50 transition-all">
            <LogIn size={11} />
            <span className="hidden sm:inline">Sign in to track</span>
          </div>
        </a>
      )}
    </div>
  );
}

function CategorySection({
  name,
  books,
  globalOffset,
  partName,
  statusMap,
  onStatusChange,
  isAuthenticated,
}: {
  name: string;
  books: Book[];
  globalOffset: number;
  partName: string;
  statusMap: Record<string, ReadingStatus>;
  onStatusChange: (key: string, status: ReadingStatus | null) => void;
  isAuthenticated: boolean;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="category-chip">{name}</span>
        <span className="font-mono-custom text-xs text-muted-foreground">{books.length} books</span>
      </div>
      <div>
        {books.map((book, i) => (
          <BookCard
            key={i}
            book={book}
            index={globalOffset + i}
            partName={partName}
            categoryName={name}
            statusMap={statusMap}
            onStatusChange={onStatusChange}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}

function PartSection({
  part,
  partIndex,
  isVisible,
  statusMap,
  onStatusChange,
  isAuthenticated,
}: {
  part: Part;
  partIndex: number;
  isVisible: boolean;
  statusMap: Record<string, ReadingStatus>;
  onStatusChange: (key: string, status: ReadingStatus | null) => void;
  isAuthenticated: boolean;
}) {
  if (!isVisible) return null;

  let globalOffset = 0;
  for (let i = 0; i < partIndex; i++) {
    globalOffset += readingListParts[i].totalBooks;
  }

  // Count completed books in this part
  const partBooks = part.categories.flatMap(c => c.books);
  const completedCount = partBooks.filter(b => statusMap[`book-${b.book}`] === "completed").length;
  const completionPct = partBooks.length > 0 ? Math.round((completedCount / partBooks.length) * 100) : 0;

  return (
    <div className="mb-16">
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
          <div className="flex items-center gap-4 mt-2">
            <p className="font-mono-custom text-xs text-muted-foreground">
              {part.totalBooks} books · {part.categories.length} categories
            </p>
            {isAuthenticated && completedCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <span className="font-mono-custom text-[11px] text-emerald-600">{completedCount}/{partBooks.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {part.categories.map((cat, ci) => {
        const catOffset = globalOffset + part.categories.slice(0, ci).reduce((sum, c) => sum + c.books.length, 0);
        return (
          <CategorySection
            key={ci}
            name={cat.name}
            books={cat.books}
            globalOffset={catOffset}
            partName={part.shortName}
            statusMap={statusMap}
            onStatusChange={onStatusChange}
            isAuthenticated={isAuthenticated}
          />
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

  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const { data: historyData = [] } = trpc.reading.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const setStatus = trpc.reading.setStatus.useMutation({
    onSuccess: () => utils.reading.list.invalidate(),
  });

  const removeStatus = trpc.reading.removeStatus.useMutation({
    onSuccess: () => utils.reading.list.invalidate(),
  });

  // Build a quick lookup: bookKey -> status
  const statusMap = useMemo(() => {
    const map: Record<string, ReadingStatus> = {};
    historyData.forEach((h) => {
      map[h.bookKey] = h.status as ReadingStatus;
    });
    return map;
  }, [historyData]);

  const handleStatusChange = (bookKey: string, status: ReadingStatus | null) => {
    if (!isAuthenticated) return;
    if (status === null) {
      removeStatus.mutate({ bookKey });
    } else {
      // Find book metadata
      let bookTitle = "";
      let partName = "";
      let categoryName = "";
      for (const part of readingListParts) {
        for (const cat of part.categories) {
          const book = cat.books.find((b) => `book-${b.book}` === bookKey);
          if (book) {
            bookTitle = book.title;
            partName = part.shortName;
            categoryName = cat.name;
            break;
          }
        }
        if (bookTitle) break;
      }
      setStatus.mutate({ bookKey, bookTitle, partName, categoryName, status });
      toast.success(`Marked as "${STATUS_CONFIG[status].label}"`, { duration: 2000 });
    }
  };

  const togglePart = (id: string) => {
    setExpandedParts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

  const totalCompleted = historyData.filter(h => h.status === "completed").length;
  const overallPct = Math.round((totalCompleted / 100) * 100);

  return (
    <Layout>
      {/* Page Header */}
      <div className="relative h-48 lg:h-64 overflow-hidden">
        <img src={READING_LIST_IMG} alt="Reading list" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.02_264)]/90 to-[oklch(0.13_0.02_264)]/60" />
        <div className="relative h-full flex flex-col justify-end px-8 pb-8">
          <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/50 mb-2">Curated Collection</span>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white">Reading List</h1>
          <p className="text-white/60 text-sm mt-2">
            {totalBookCount} curated books across business and entrepreneurship
          </p>
          {isAuthenticated && totalCompleted > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${overallPct}%` }} />
              </div>
              <span className="text-white/60 text-xs font-mono-custom">{totalCompleted}/100 completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Filter Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border bg-[oklch(0.99_0.002_80)] sticky top-0 h-screen overflow-y-auto hidden lg:block">
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

            {/* My Progress (if signed in) */}
            {isAuthenticated && historyData.length > 0 && (
              <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-custom text-[10px] uppercase tracking-widest text-emerald-700">My Progress</span>
                  <Link href="/profile">
                    <span className="font-mono-custom text-[10px] text-emerald-600 hover:underline cursor-pointer">View all</span>
                  </Link>
                </div>
                <div className="h-1.5 bg-emerald-200 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallPct}%` }} />
                </div>
                <div className="flex justify-between">
                  <span className="font-mono-custom text-[11px] text-emerald-700">{totalCompleted} completed</span>
                  <span className="font-mono-custom text-[11px] text-emerald-600">{overallPct}%</span>
                </div>
              </div>
            )}

            {/* Sign in prompt (if not signed in) */}
            {!isAuthenticated && (
              <div className="mb-5 p-3 bg-[oklch(0.51_0.22_264)]/5 border border-[oklch(0.51_0.22_264)]/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Sign in to track your reading progress</p>
                <a href={getLoginUrl()}>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[oklch(0.51_0.22_264)] hover:underline">
                    <LogIn size={12} />
                    Sign in
                  </div>
                </a>
              </div>
            )}

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

            {/* Part filters */}
            <div className="space-y-0.5">
              {readingListParts.map((part, i) => {
                const partBooks = part.categories.flatMap(c => c.books);
                const partCompleted = partBooks.filter(b => statusMap[`book-${b.book}`] === "completed").length;
                const partPct = isAuthenticated && partCompleted > 0 ? Math.round((partCompleted / partBooks.length) * 100) : 0;

                return (
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
                      {partPct > 0 && (
                        <span className="font-mono-custom text-[10px] text-emerald-600 shrink-0">{partPct}%</span>
                      )}
                      <span className="font-mono-custom text-[10px] opacity-50 shrink-0">{part.totalBooks}</span>
                    </button>

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
                );
              })}
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

          {filteredParts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={40} className="text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No books found</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            filteredParts.map((part) => {
              const originalIndex = readingListParts.findIndex(p => p.id === part.id);
              return (
                <PartSection
                  key={part.id}
                  part={part}
                  partIndex={originalIndex}
                  isVisible={true}
                  statusMap={statusMap}
                  onStatusChange={handleStatusChange}
                  isAuthenticated={isAuthenticated}
                />
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
