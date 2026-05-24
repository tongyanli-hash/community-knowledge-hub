/*
 * DESIGN SYSTEM: Warm & Welcoming
 * Home page: Full-bleed warm library hero, cozy amber tones
 * Stats bar, feature cards, community CTA
 */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { BookOpen, Users, Archive, ArrowRight, TrendingUp, Lightbulb, Globe, Database } from "lucide-react";
import { totalBookCount } from "@/data/readingList";
import { domains } from "@/data/domains";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663273273644/HCJmvRPNXzYHmA4mt7a4Uy/hero-warm-7g5yWi57oSXZMKxAL35BZM.webp";

const COMMUNITY_IMG = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80&auto=format&fit=crop";

const features = [
  {
    icon: BookOpen,
    title: "Curated Reading List",
    description: "100 carefully selected books across 8 domains — from macroeconomics and startup thinking to product development, marketing, and team building.",
    href: "/reading-list",
    cta: "Browse Books",
  },
  {
    icon: Database,
    title: "Knowledge Domains",
    description: "Deep-dive curricula on specialized topics — Data Engineering, Product Management, Finance, and more — each with learning paths, tools, and reading list cross-links.",
    href: "/domains",
    cta: "Explore Domains",
  },
  {
    icon: Users,
    title: "Community Discussions",
    description: "Connect with fellow learners, share insights from your reading, and engage in structured discussions on key business and entrepreneurship topics.",
    href: "/community",
    cta: "Join Discussion",
  },
  {
    icon: Archive,
    title: "Resource Library",
    description: "Access curated articles, frameworks, templates, and tools contributed by community members to accelerate your learning journey.",
    href: "/resources",
    cta: "Explore Resources",
  },
];

const stats = [
  { value: `${totalBookCount}`, label: "Curated Books" },
  { value: "8", label: "Knowledge Domains" },
  { value: "30+", label: "Categories" },
  { value: "500+", label: "Members" },
];

export default function Home() {
  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="relative h-[88vh] min-h-[560px] max-h-[760px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Library reading room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Warm amber-tinted overlay — left side heavier for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.04_48)]/85 via-[oklch(0.14_0.04_48)]/55 to-[oklch(0.14_0.04_48)]/15" />

        <div className="relative h-full flex flex-col justify-end pb-16 px-8 lg:px-16 max-w-3xl">
          <div className="animate-fade-in-up">
            <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/60 mb-4 block">
              Community Knowledge Hub
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Learn Together,<br />
              <em className="not-italic text-[oklch(0.88_0.06_75)]">Grow Further</em>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-xl mb-8">
              A curated knowledge platform for entrepreneurs and business builders. Explore our reading list, share insights, and connect with a community of serious learners.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/reading-list">
                <button className="flex items-center gap-2 bg-[oklch(0.56_0.14_58)] hover:bg-[oklch(0.50_0.13_58)] text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors duration-150">
                  <BookOpen size={16} />
                  Explore Reading List
                  <ArrowRight size={14} />
                </button>
              </Link>
              <Link href="/community">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 text-sm font-semibold rounded-sm transition-colors duration-150 backdrop-blur-sm">
                  <Users size={16} />
                  Join Community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[oklch(0.24_0.05_48)] text-white">
        <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left border-l border-white/10 pl-6 first:border-l-0 first:pl-0 lg:first:border-l lg:first:pl-6">
              <div className="font-display text-3xl font-bold text-[oklch(0.88_0.06_75)]">{stat.value}</div>
              <div className="font-mono-custom text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[oklch(0.56_0.14_58)] mb-3 block">What We Offer</span>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Everything you need to<br />accelerate your learning
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group bg-card border border-border rounded-lg p-8 hover:shadow-[0_6px_28px_oklch(0.56_0.14_58/0.14)] hover:border-[oklch(0.78_0.12_65)]/60 transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 bg-[oklch(0.56_0.14_58)]/10 rounded-sm flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[oklch(0.56_0.14_58)]" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{feature.description}</p>
                <Link href={feature.href}>
                  <button className="flex items-center gap-1.5 text-[oklch(0.56_0.14_58)] text-sm font-semibold group-hover:gap-2.5 transition-all duration-150">
                    {feature.cta}
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Knowledge Domains Spotlight */}
      <section className="py-16 px-8 lg:px-16 bg-[oklch(0.97_0.015_78)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[oklch(0.56_0.14_58)] mb-2 block">Specialized Learning</span>
              <h2 className="font-display text-3xl font-bold text-foreground">Knowledge Domains</h2>
            </div>
            <Link href="/domains">
              <button className="hidden md:flex items-center gap-1.5 text-sm text-[oklch(0.56_0.14_58)] font-semibold hover:gap-2.5 transition-all">
                View all domains <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((domain) => (
              <Link key={domain.id} href={domain.status === "active" ? `/domains/${domain.slug}` : "/domains"}>
                <div className={`group relative border rounded-sm p-5 transition-all duration-200 overflow-hidden ${
                  domain.status === "active"
                    ? "border-border bg-card hover:border-[oklch(0.56_0.14_58)]/50 hover:shadow-md cursor-pointer"
                    : "border-border/40 bg-muted/20 opacity-60 cursor-default"
                }`}>
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10" style={{ background: domain.color }} />
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center mb-3" style={{ background: `${domain.color}20` }}>
                    <Database size={15} style={{ color: domain.color }} />
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground mb-1 group-hover:text-[oklch(0.56_0.14_58)] transition-colors">{domain.title}</h3>
                  <p className="text-xs text-muted-foreground leading-snug mb-3">{domain.subtitle}</p>
                  {domain.status === "active" ? (
                    <span className="font-mono-custom text-[10px] bg-[oklch(0.56_0.14_58)]/10 text-[oklch(0.56_0.14_58)] px-2 py-0.5 rounded-sm uppercase tracking-wider">Available</span>
                  ) : (
                    <span className="font-mono-custom text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-sm uppercase tracking-wider">Coming Soon</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative overflow-hidden">
        <img
          src={COMMUNITY_IMG}
          alt="Community collaboration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.24_0.05_48)]/85" />
        <div className="relative py-20 px-8 lg:px-16 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[oklch(0.88_0.06_75)] mb-4 block">Our Mission</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Knowledge shared is knowledge multiplied
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              We believe that the best way to learn is together. Our community brings together entrepreneurs, investors, and business builders who are committed to continuous learning and mutual growth.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { icon: TrendingUp, label: "Business Growth" },
                { icon: Lightbulb, label: "Innovation" },
                { icon: Globe, label: "Global Perspective" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex flex-col items-start gap-2">
                    <Icon size={20} className="text-[oklch(0.88_0.06_75)]" />
                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
            <Link href="/community">
              <button className="flex items-center gap-2 bg-[oklch(0.88_0.06_75)] hover:bg-[oklch(0.85_0.05_80)] text-[oklch(0.24_0.05_48)] px-6 py-3 text-sm font-bold rounded-sm transition-colors duration-150">
                Join the Community
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.18_0.04_48)] text-white/50 py-10 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[oklch(0.56_0.14_58)] flex items-center justify-center">
              <BookOpen size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-white/80 text-sm">Community Knowledge Hub</span>
          </div>
          <div className="flex gap-6 text-xs font-mono-custom uppercase tracking-widest">
            <Link href="/reading-list"><span className="hover:text-white transition-colors">Reading List</span></Link>
            <Link href="/domains"><span className="hover:text-white transition-colors">Domains</span></Link>
            <Link href="/community"><span className="hover:text-white transition-colors">Community</span></Link>
            <Link href="/resources"><span className="hover:text-white transition-colors">Resources</span></Link>
          </div>
          <p className="font-mono-custom text-xs">© 2024 Community Knowledge Hub</p>
        </div>
      </footer>
    </Layout>
  );
}
