/*
 * DESIGN SYSTEM: Structured Clarity
 * Resources page: Frameworks, articles, templates, tools
 */

import Layout from "@/components/Layout";
import { FileText, Link2, Layout as LayoutIcon, Wrench, ArrowRight, Download, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { id: "frameworks", label: "Frameworks", icon: LayoutIcon, count: 12 },
  { id: "articles", label: "Articles", icon: FileText, count: 28 },
  { id: "templates", label: "Templates", icon: Download, count: 8 },
  { id: "tools", label: "Tools", icon: Wrench, count: 15 },
];

const resources = [
  {
    type: "frameworks",
    title: "Business Model Canvas",
    description: "A strategic management template for developing new or documenting existing business models. Covers key partners, activities, resources, value propositions, customer relationships, channels, segments, cost structure, and revenue streams.",
    tags: ["Strategy", "Startup"],
    source: "Strategyzer",
    featured: true,
  },
  {
    type: "frameworks",
    title: "OKR Goal-Setting Framework",
    description: "Objectives and Key Results — the goal-setting system used by Google, Intel, and Amazon. Includes quarterly planning templates, scoring guides, and common pitfalls to avoid.",
    tags: ["Management", "Team Building"],
    source: "Community",
    featured: true,
  },
  {
    type: "frameworks",
    title: "AARRR Growth Metrics",
    description: "The Pirate Metrics framework: Acquisition, Activation, Retention, Referral, Revenue. A systematic approach to measuring and optimizing growth at each stage of the customer lifecycle.",
    tags: ["Growth", "Marketing"],
    source: "Community",
    featured: false,
  },
  {
    type: "articles",
    title: "How to Read a Financial Statement in 30 Minutes",
    description: "A practical guide for non-finance founders covering the income statement, balance sheet, and cash flow statement. Based on insights from 《手把手教你读财报》.",
    tags: ["Finance", "Founders"],
    source: "Community",
    featured: true,
  },
  {
    type: "articles",
    title: "Positioning in the Digital Age: Is Al Ries Still Relevant?",
    description: "An analysis of how the classic positioning framework applies to modern digital marketing, social media, and platform businesses. With case studies from Chinese tech companies.",
    tags: ["Marketing", "Strategy"],
    source: "Community",
    featured: false,
  },
  {
    type: "articles",
    title: "The Lean Startup in China: Adapting Agile Methods to Chinese Markets",
    description: "How to apply lean startup principles in China's unique business environment, where market dynamics, regulatory requirements, and consumer behavior differ significantly from Silicon Valley.",
    tags: ["Startup", "China"],
    source: "Community",
    featured: false,
  },
  {
    type: "templates",
    title: "Startup Financial Model (3-Year Projection)",
    description: "A comprehensive Excel template for early-stage startups covering revenue projections, burn rate, runway calculation, and unit economics. Includes instructions and worked examples.",
    tags: ["Finance", "Templates"],
    source: "Community",
    featured: true,
  },
  {
    type: "templates",
    title: "Equity Structure Term Sheet Template",
    description: "A standard term sheet template for early-stage equity financing, with annotations explaining key terms and negotiation points. Based on insights from 《风险投资的游戏》.",
    tags: ["Legal", "Fundraising"],
    source: "Community",
    featured: false,
  },
  {
    type: "tools",
    title: "Book Summary Generator",
    description: "A community tool for generating structured summaries of books on the reading list. Submit your notes and get a formatted summary to share with the community.",
    tags: ["Learning", "Community"],
    source: "Community",
    featured: true,
  },
];

const typeLabels: Record<string, string> = {
  frameworks: "Framework",
  articles: "Article",
  templates: "Template",
  tools: "Tool",
};

const typeColors: Record<string, string> = {
  frameworks: "bg-blue-50 text-blue-700",
  articles: "bg-emerald-50 text-emerald-700",
  templates: "bg-amber-50 text-amber-700",
  tools: "bg-violet-50 text-violet-700",
};

export default function Resources() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-[oklch(0.18_0.04_155)] px-8 py-12">
        <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/40 mb-2 block">Community Library</span>
        <h1 className="font-display text-4xl font-bold text-white mb-3">Resources</h1>
        <p className="text-white/60 text-sm max-w-xl">
          Frameworks, articles, templates, and tools curated by the community to accelerate your learning.
        </p>
      </div>

      <div className="px-8 py-8 max-w-6xl">
        {/* Category Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-sm p-4 flex items-center gap-3 hover:border-[oklch(0.33_0.09_155)]/30 hover:shadow-sm transition-all cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
                onClick={() => toast.info("Feature coming soon — resource filtering is in development.")}
              >
                <div className="w-9 h-9 bg-[oklch(0.33_0.09_155)]/10 rounded-sm flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[oklch(0.33_0.09_155)]" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-foreground leading-none">{cat.count}</div>
                  <div className="font-mono-custom text-xs text-muted-foreground uppercase tracking-wide">{cat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Resources */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground">Featured Resources</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {resources.filter(r => r.featured).map((resource, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-sm p-5 hover:border-[oklch(0.33_0.09_155)]/30 hover:shadow-md transition-all duration-200 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
                onClick={() => toast.info("Feature coming soon — full resource library is in development.")}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-mono-custom font-medium uppercase tracking-wide ${typeColors[resource.type]}`}>
                      {typeLabels[resource.type]}
                    </span>
                    {resource.source === "Community" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-mono-custom bg-[oklch(0.33_0.09_155)]/10 text-[oklch(0.33_0.09_155)] uppercase tracking-wide">
                        Community
                      </span>
                    )}
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground/40 group-hover:text-[oklch(0.33_0.09_155)] transition-colors shrink-0" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-[oklch(0.33_0.09_155)] transition-colors">
                  {resource.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                  {resource.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.map((tag, ti) => (
                    <span key={ti} className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono-custom rounded-sm uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-foreground">All Resources</h2>
            <span className="font-mono-custom text-xs text-muted-foreground">{resources.length} total</span>
          </div>
          <div className="space-y-2">
            {resources.map((resource, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 px-4 border border-border rounded-sm hover:border-[oklch(0.33_0.09_155)]/30 hover:bg-[oklch(0.33_0.09_155)]/[0.02] transition-all duration-150 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i * 30, 200)}ms`, opacity: 0, animationFillMode: 'forwards' }}
                onClick={() => toast.info("Feature coming soon — full resource library is in development.")}
              >
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${typeColors[resource.type].replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                  {resource.type === 'frameworks' && <LayoutIcon size={14} />}
                  {resource.type === 'articles' && <FileText size={14} />}
                  {resource.type === 'templates' && <Download size={14} />}
                  {resource.type === 'tools' && <Wrench size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-[oklch(0.33_0.09_155)] transition-colors">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{resource.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-mono-custom font-medium uppercase tracking-wide ${typeColors[resource.type]}`}>
                    {typeLabels[resource.type]}
                  </span>
                  <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-[oklch(0.33_0.09_155)] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribute CTA */}
        <div className="mt-10 p-6 bg-[oklch(0.33_0.09_155)]/5 border border-[oklch(0.33_0.09_155)]/20 rounded-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-foreground mb-1">Contribute a Resource</h3>
              <p className="text-sm text-muted-foreground">
                Have a framework, article, or template that would help the community? Share it and earn recognition.
              </p>
            </div>
            <button
              onClick={() => toast.info("Feature coming soon — resource submission is in development.")}
              className="flex items-center gap-2 bg-[oklch(0.33_0.09_155)] text-white px-5 py-2.5 text-sm font-semibold rounded-sm hover:bg-[oklch(0.28_0.09_155)] transition-colors shrink-0"
            >
              <Link2 size={14} />
              Submit Resource
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
