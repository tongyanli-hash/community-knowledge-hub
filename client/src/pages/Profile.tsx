import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import {
  BookOpen, CheckCircle2, Clock, Bookmark, LogIn,
  TrendingUp, Star, Calendar, ArrowRight, Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_LABELS = {
  want_to_read: { label: "Want to Read", color: "text-blue-600", bg: "bg-blue-50", icon: Clock },
  reading: { label: "Reading", color: "text-amber-600", bg: "bg-amber-50", icon: BookOpen },
  completed: { label: "Completed", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
};

function UserInitialsBig({ name }: { name: string | null | undefined }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  return (
    <div className="w-16 h-16 rounded-full bg-[oklch(0.51_0.22_264)] flex items-center justify-center text-xl font-bold text-white">
      {initials}
    </div>
  );
}

export default function Profile() {
  const { user, isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();

  const { data: history = [] } = trpc.reading.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: bookmarksList = [] } = trpc.bookmarks.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const removeStatus = trpc.reading.removeStatus.useMutation({
    onSuccess: () => utils.reading.list.invalidate(),
  });

  const toggleBookmark = trpc.bookmarks.toggle.useMutation({
    onSuccess: () => utils.bookmarks.list.invalidate(),
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-6 h-6 border-2 border-[oklch(0.51_0.22_264)] border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[oklch(0.51_0.22_264)]/10 flex items-center justify-center mb-5">
            <LogIn size={28} className="text-[oklch(0.51_0.22_264)]" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Sign in to view your profile</h1>
          <p className="text-muted-foreground text-sm max-w-sm mb-8">
            Track your reading progress, save bookmarks, and see your learning journey across all knowledge domains.
          </p>
          <a href={getLoginUrl()}>
            <button className="flex items-center gap-2 bg-[oklch(0.51_0.22_264)] text-white px-6 py-3 text-sm font-semibold rounded-lg hover:bg-[oklch(0.44_0.20_264)] transition-colors">
              <LogIn size={16} />
              Sign In to Continue
            </button>
          </a>
        </div>
      </Layout>
    );
  }

  const completed = history.filter((h) => h.status === "completed");
  const reading = history.filter((h) => h.status === "reading");
  const wantToRead = history.filter((h) => h.status === "want_to_read");

  const completionRate = history.length > 0
    ? Math.round((completed.length / 100) * 100)
    : 0;

  const partProgress: Record<string, { completed: number; total: number }> = {};
  history.forEach((h) => {
    if (!h.partName) return;
    if (!partProgress[h.partName]) partProgress[h.partName] = { completed: 0, total: 0 };
    partProgress[h.partName].total++;
    if (h.status === "completed") partProgress[h.partName].completed++;
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <UserInitialsBig name={user?.name} />
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{user?.name ?? "Member"}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{user?.email ?? ""}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Calendar size={12} className="text-muted-foreground" />
              <span className="font-mono-custom text-[11px] text-muted-foreground uppercase tracking-wider">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: CheckCircle2, value: completed.length, label: "Books Completed", color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: BookOpen, value: reading.length, label: "Currently Reading", color: "text-amber-600", bg: "bg-amber-50" },
            { icon: Clock, value: wantToRead.length, label: "Want to Read", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Bookmark, value: bookmarksList.length, label: "Bookmarks", color: "text-[oklch(0.51_0.22_264)]", bg: "bg-[oklch(0.51_0.22_264)]/8" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", stat.bg)}>
                  <Icon size={18} className={stat.color} />
                </div>
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[oklch(0.51_0.22_264)]" />
              <span className="font-display font-bold text-sm text-foreground">Overall Reading Progress</span>
            </div>
            <span className="font-mono-custom text-xs text-muted-foreground">{completed.length} / 100 books</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-[oklch(0.51_0.22_264)] rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-mono-custom text-[11px] text-muted-foreground">{completionRate}% complete</span>
            <Link href="/reading-list">
              <span className="font-mono-custom text-[11px] text-[oklch(0.51_0.22_264)] hover:underline cursor-pointer flex items-center gap-1">
                Continue reading <ArrowRight size={10} />
              </span>
            </Link>
          </div>
        </div>

        {/* Reading History */}
        {history.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">Reading History</h2>
              <span className="font-mono-custom text-xs text-muted-foreground">{history.length} books tracked</span>
            </div>
            <div className="space-y-2">
              {history.map((entry) => {
                const statusInfo = STATUS_LABELS[entry.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <div key={entry.id} className="flex items-center gap-4 bg-card border border-border rounded-lg px-4 py-3 group hover:border-[oklch(0.51_0.22_264)]/30 transition-colors">
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0", statusInfo.bg)}>
                      <StatusIcon size={14} className={statusInfo.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">{entry.bookTitle}</div>
                      {(entry.partName || entry.categoryName) && (
                        <div className="font-mono-custom text-[11px] text-muted-foreground mt-0.5">
                          {entry.partName}{entry.categoryName ? ` · ${entry.categoryName}` : ""}
                        </div>
                      )}
                    </div>
                    <span className={cn("font-mono-custom text-[11px] px-2 py-0.5 rounded-full shrink-0", statusInfo.bg, statusInfo.color)}>
                      {statusInfo.label}
                    </span>
                    <button
                      onClick={() => removeStatus.mutate({ bookKey: entry.bookKey })}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                      title="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bookmarks */}
        {bookmarksList.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">Saved Resources</h2>
              <span className="font-mono-custom text-xs text-muted-foreground">{bookmarksList.length} saved</span>
            </div>
            <div className="space-y-2">
              {bookmarksList.map((bm) => (
                <div key={bm.id} className="flex items-center gap-4 bg-card border border-border rounded-lg px-4 py-3 group hover:border-[oklch(0.51_0.22_264)]/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[oklch(0.51_0.22_264)]/8 flex items-center justify-center shrink-0">
                    <Star size={14} className="text-[oklch(0.51_0.22_264)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">{bm.resourceTitle}</div>
                    {bm.resourceType && (
                      <div className="font-mono-custom text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wider">{bm.resourceType}</div>
                    )}
                  </div>
                  {bm.resourceUrl && (
                    <a href={bm.resourceUrl} target="_blank" rel="noopener noreferrer"
                      className="font-mono-custom text-[11px] text-[oklch(0.51_0.22_264)] hover:underline shrink-0 flex items-center gap-1">
                      Open <ArrowRight size={10} />
                    </a>
                  )}
                  <button
                    onClick={() => toggleBookmark.mutate({ resourceKey: bm.resourceKey, resourceTitle: bm.resourceTitle })}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                    title="Remove bookmark"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {history.length === 0 && bookmarksList.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Your reading journey starts here</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
              Head to the Reading List and mark your first book to start tracking your progress.
            </p>
            <Link href="/reading-list">
              <button className="flex items-center gap-2 bg-[oklch(0.51_0.22_264)] text-white px-5 py-2.5 text-sm font-semibold rounded-lg hover:bg-[oklch(0.44_0.20_264)] transition-colors mx-auto">
                <BookOpen size={15} />
                Go to Reading List
              </button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
