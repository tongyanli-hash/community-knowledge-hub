/*
 * DESIGN SYSTEM: Warm & Welcoming
 * Knowledge Domains hub — grid of domain cards with status, stats, and cross-links to reading list
 */
import Layout from "@/components/Layout";
import { domains } from "@/data/domains";
import { Link } from "wouter";
import { ArrowRight, Database, Layers, TrendingUp, Megaphone, BookOpen, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const DOMAIN_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Database,
  Layers,
  TrendingUp,
  Megaphone,
};

const DOMAINS_HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663273273644/HCJmvRPNXzYHmA4mt7a4Uy/hero-warm-7g5yWi57oSXZMKxAL35BZM.webp";

export default function Domains() {
  const activeDomains = domains.filter((d) => d.status === "active");
  const comingSoon = domains.filter((d) => d.status === "coming-soon");

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img src={DOMAINS_HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.04_48)]/85 via-[oklch(0.14_0.04_48)]/60 to-[oklch(0.14_0.04_48)]/25" />
        <div className="relative h-full flex flex-col justify-end pb-10 px-8 lg:px-12">
          <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/50 mb-2 block">
            Specialized Learning
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
            Knowledge Domains
          </h1>
          <p className="text-white/65 text-sm mt-2 max-w-xl">
            Deep-dive curricula on specialized topics — each domain integrates curated tools, learning paths, and cross-links to the reading list.
          </p>
        </div>
      </div>

      <div className="px-8 lg:px-12 py-10">
        {/* Active domains */}
        {activeDomains.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-custom text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Available Now
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeDomains.map((domain) => {
                const Icon = DOMAIN_ICONS[domain.icon] ?? Database;
                return (
                  <Link key={domain.id} href={`/domains/${domain.slug}`}>
                    <div className="group relative border border-border rounded-lg p-6 hover:border-[oklch(0.78_0.12_65)] hover:shadow-[0_4px_20px_oklch(0.56_0.14_58/0.12)] transition-all duration-200 cursor-pointer bg-card overflow-hidden">
                      {/* Background accent */}
                      <div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-10"
                        style={{ background: domain.color }}
                      />
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                          style={{ background: `${domain.color}20` }}
                        >
                          <Icon size={18} style={{ color: domain.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-display text-lg font-bold text-foreground group-hover:text-[oklch(0.56_0.14_58)] transition-colors">
                            {domain.title}
                          </h2>
                          <p className="text-xs text-muted-foreground mt-0.5">{domain.subtitle}</p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-muted-foreground/30 group-hover:text-[oklch(0.56_0.14_58)] group-hover:translate-x-1 transition-all shrink-0 mt-1"
                        />
                      </div>

                      {/* Stats row */}
                      {domain.stats.length > 0 && (
                        <div className="flex gap-5 mb-4">
                          {domain.stats.map((s) => (
                            <div key={s.label}>
                              <div className="font-display text-xl font-bold text-foreground">{s.value}</div>
                              <div className="font-mono-custom text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Related reading list parts */}
                      {domain.relatedReadingListParts.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <BookOpen size={11} className="text-muted-foreground/50 shrink-0" />
                          <span className="font-mono-custom text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                            Reading List:
                          </span>
                          {domain.relatedReadingListParts.map((part) => (
                            <span
                              key={part}
                              className="font-mono-custom text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-sm"
                            >
                              {part}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Coming soon */}
        {comingSoon.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-custom text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Coming Soon
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comingSoon.map((domain) => {
                const Icon = DOMAIN_ICONS[domain.icon] ?? Database;
                return (
                  <div
                    key={domain.id}
                    className="relative border border-border/50 rounded-sm p-5 bg-muted/30 overflow-hidden opacity-70"
                  >
                    <div className="absolute top-3 right-3">
                      <Lock size={12} className="text-muted-foreground/40" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                        style={{ background: `${domain.color}15` }}
                      >
                        <Icon size={15} style={{ color: domain.color }} className="opacity-60" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold text-foreground/70">{domain.title}</h3>
                        <p className="text-[11px] text-muted-foreground/60 mt-0.5">{domain.subtitle}</p>
                      </div>
                    </div>
                    {domain.relatedReadingListParts.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mt-3">
                        <BookOpen size={10} className="text-muted-foreground/40 shrink-0" />
                        {domain.relatedReadingListParts.map((part) => (
                          <span
                            key={part}
                            className="font-mono-custom text-[10px] bg-muted text-muted-foreground/50 px-1.5 py-0.5 rounded-sm"
                          >
                            {part}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-14 border border-dashed border-border rounded-sm p-8 text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">Suggest a Domain</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-5">
            Is there a knowledge area you'd like to see covered? We're building out new domains based on community interest.
          </p>
          <Link href="/community">
            <button className="flex items-center gap-2 mx-auto bg-[oklch(0.56_0.14_58)] text-white px-5 py-2.5 text-sm font-semibold rounded-sm hover:bg-[oklch(0.50_0.13_58)] transition-colors">
              Share in Community
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
