/*
 * DESIGN SYSTEM: Modern Clean
 * Domain Detail page — concept map, learning paths, resources, reading list cross-links
 */
import { useState } from "react";
import Layout from "@/components/Layout";
import { getDomainBySlug } from "@/data/domains";
import { allBooks } from "@/data/readingList";
import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  BookOpen,
  Database,
  Layers,
  TrendingUp,
  Megaphone,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Wrench,
  Users,
  FileText,
  BookMarked,
  Globe,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DOMAIN_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Database,
  Layers,
  TrendingUp,
  Megaphone,
};

const RESOURCE_ICONS = {
  tool: Wrench,
  course: GraduationCap,
  article: FileText,
  framework: BookMarked,
  book: BookOpen,
  community: Users,
};

const RESOURCE_LABELS = {
  tool: "Tool",
  course: "Course",
  article: "Article",
  framework: "Framework",
  book: "Book",
  community: "Community",
};

export default function DomainDetail() {
  const params = useParams<{ slug: string }>();
  const domain = getDomainBySlug(params.slug);
  const [activeLevel, setActiveLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [activeResourceType, setActiveResourceType] = useState<string>("all");

  if (!domain) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8">
          <h1 className="font-display text-3xl font-bold mb-3">Domain Not Found</h1>
          <Link href="/domains">
            <button className="flex items-center gap-2 bg-[oklch(0.51_0.22_264)] text-white px-5 py-2.5 text-sm font-semibold rounded-sm">
              <ArrowLeft size={14} /> Back to Domains
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = DOMAIN_ICONS[domain.icon] ?? Database;

  // Find related books from the reading list
  const relatedBooks = allBooks.filter((book) =>
    domain.concepts.some((c) => c.relatedBooks?.includes(book.title))
  );

  // Also find books from related parts
  const partRelatedBooks = allBooks.filter((book) =>
    domain.relatedReadingListParts.some((part) => book.part.includes(part))
  ).slice(0, 8);

  const allRelatedBooks = [
    ...relatedBooks,
    ...partRelatedBooks.filter((b) => !relatedBooks.find((rb) => rb.title === b.title)),
  ].slice(0, 10);

  // Filter resources
  const resourceTypes = ["all", ...Array.from(new Set(domain.resources.map((r) => r.type)))];
  const filteredResources =
    activeResourceType === "all"
      ? domain.resources
      : domain.resources.filter((r) => r.type === activeResourceType);

  const activePath = domain.learningPaths.find((p) => p.level === activeLevel);

  return (
    <Layout>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${domain.color}18 0%, oklch(0.98 0.012 82) 60%)` }}
      >
        <div className="px-8 lg:px-12 pt-8 pb-10">
          <Link href="/domains">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono-custom uppercase tracking-wider">
              <ArrowLeft size={12} /> Knowledge Domains
            </button>
          </Link>
          <div className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-sm flex items-center justify-center shrink-0"
              style={{ background: `${domain.color}20` }}
            >
              <Icon size={26} style={{ color: domain.color }} />
            </div>
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {domain.title}
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5 max-w-2xl">{domain.subtitle}</p>
            </div>
          </div>

          {/* Stats */}
          {domain.stats.length > 0 && (
            <div className="flex gap-8 mt-8">
              {domain.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="font-mono-custom text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-8 lg:px-12 py-10 space-y-14">
        {/* Overview */}
        <section>
          <SectionHeader label="Overview" title="What is Data Engineering?" />
          <p className="text-foreground/80 leading-relaxed max-w-3xl text-sm mt-4">{domain.description}</p>
        </section>

        {/* Core Concepts */}
        <section>
          <SectionHeader label="Curriculum" title="Core Concepts" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {domain.concepts.map((concept) => (
              <div
                key={concept.id}
                className="border border-border rounded-lg p-5 hover:border-[oklch(0.65_0.18_264)]/60 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-[oklch(0.51_0.22_264)] transition-colors">
                    {concept.title}
                  </h3>
                  {concept.relatedBooks && concept.relatedBooks.length > 0 && (
                    <span className="flex items-center gap-1 font-mono-custom text-[10px] text-[oklch(0.51_0.22_264)] bg-[oklch(0.51_0.22_264)]/10 px-1.5 py-0.5 rounded-sm shrink-0">
                      <BookOpen size={9} /> {concept.relatedBooks.length} book{concept.relatedBooks.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{concept.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {concept.subtopics.map((sub) => (
                    <span key={sub} className="font-mono-custom text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        {domain.learningPaths.length > 0 && (
          <section>
            <SectionHeader label="Structured Learning" title="Learning Paths" />
            <div className="mt-5">
              {/* Level tabs */}
              <div className="flex gap-1 mb-6 border-b border-border">
                {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => {
                  const path = domain.learningPaths.find((p) => p.level === level);
                  if (!path) return null;
                  return (
                    <button
                      key={level}
                      onClick={() => setActiveLevel(level)}
                      className={cn(
                        "px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors font-mono-custom uppercase tracking-wider text-xs",
                        activeLevel === level
                          ? "border-[oklch(0.51_0.22_264)] text-[oklch(0.51_0.22_264)]"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>

              {activePath && (
                <div className="max-w-2xl">
                  <p className="text-sm text-muted-foreground mb-6">{activePath.description}</p>
                  <div className="space-y-0">
                    {activePath.steps.map((step, i) => (
                      <div key={i} className="flex gap-4 group">
                        {/* Connector line */}
                        <div className="flex flex-col items-center">
                          <div
                            className="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                            style={{ borderColor: `${domain.color}60`, background: `${domain.color}10` }}
                          >
                            <span className="font-mono-custom text-[10px] font-bold" style={{ color: domain.color }}>
                              {i + 1}
                            </span>
                          </div>
                          {i < activePath.steps.length - 1 && (
                            <div className="w-px flex-1 my-1" style={{ background: `${domain.color}25` }} />
                          )}
                        </div>
                        <div className={cn("pb-6", i === activePath.steps.length - 1 && "pb-0")}>
                          <h4 className="font-display text-sm font-bold text-foreground mb-1">{step.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Resources */}
        {domain.resources.length > 0 && (
          <section>
            <SectionHeader label="Curated Resources" title="Tools, Courses & Communities" />
            {/* Filter tabs */}
            <div className="flex gap-1.5 flex-wrap mt-5 mb-5">
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveResourceType(type)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors capitalize font-mono-custom uppercase tracking-wider",
                    activeResourceType === type
                      ? "bg-[oklch(0.51_0.22_264)] text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {type === "all" ? `All (${domain.resources.length})` : RESOURCE_LABELS[type as keyof typeof RESOURCE_LABELS] ?? type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredResources.map((resource, i) => {
                const RIcon = RESOURCE_ICONS[resource.type] ?? Globe;
                return (
                  <a
                    key={i}
                    href={resource.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col border border-border rounded-lg p-4 hover:border-[oklch(0.65_0.18_264)]/60 hover:shadow-sm transition-all duration-150"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-7 h-7 bg-muted rounded-sm flex items-center justify-center shrink-0">
                        <RIcon size={13} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display text-sm font-bold text-foreground group-hover:text-[oklch(0.51_0.22_264)] transition-colors leading-snug">
                            {resource.title}
                          </h4>
                          <ExternalLink size={10} className="text-muted-foreground/40 group-hover:text-[oklch(0.51_0.22_264)]/60 shrink-0" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">{resource.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-mono-custom text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider"
                        style={{ background: `${domain.color}15`, color: domain.color }}
                      >
                        {RESOURCE_LABELS[resource.type]}
                      </span>
                      {resource.free && (
                        <span className="font-mono-custom text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                          Free
                        </span>
                      )}
                      {resource.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="font-mono-custom text-[10px] bg-muted text-muted-foreground/70 px-1.5 py-0.5 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Reading List Cross-links */}
        {allRelatedBooks.length > 0 && (
          <section>
            <SectionHeader label="From the Reading List" title="Recommended Books" />
            <p className="text-sm text-muted-foreground mt-2 mb-5">
              Books from our curated reading list that complement this domain.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {allRelatedBooks.map((book, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 border border-border rounded-sm hover:border-[oklch(0.51_0.22_264)]/30 transition-colors group"
                >
                  <div className="w-7 h-7 bg-[oklch(0.51_0.22_264)]/10 rounded-sm flex items-center justify-center shrink-0">
                    <BookOpen size={12} className="text-[oklch(0.51_0.22_264)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">{book.title}</p>
                    {book.author && (
                      <p className="font-mono-custom text-xs text-muted-foreground mt-0.5">{book.author}</p>
                    )}
                    <p className="font-mono-custom text-[10px] text-muted-foreground/50 mt-1 uppercase tracking-wider">
                      {book.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/reading-list">
                <button className="flex items-center gap-2 text-sm text-[oklch(0.51_0.22_264)] font-semibold hover:gap-3 transition-all">
                  View full reading list <ChevronRight size={14} />
                </button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <span className="font-mono-custom text-[10px] tracking-[0.18em] uppercase text-muted-foreground block mb-0.5">
          {label}
        </span>
        <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="flex-1 h-px bg-border mt-5" />
    </div>
  );
}
