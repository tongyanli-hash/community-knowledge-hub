/*
 * DESIGN SYSTEM: Structured Clarity
 * Home page: Full-bleed hero with library image, asymmetric layout
 * Stats bar, feature cards, community CTA
 */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { BookOpen, Users, Archive, ArrowRight, TrendingUp, Lightbulb, Globe } from "lucide-react";
import { totalBookCount } from "@/data/readingList";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/L084l32Vn0CzxjyMV7geBH/sandbox/odBZMa5bBYVoWN5sVBha6S-img-1_1771474125000_na1fn_aGVyby1iYW5uZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTDA4NGwzMlZuMEN6eGp5TVY3Z2VCSC9zYW5kYm94L29kQlpNYTViQllWb1dONXNWQmhhNlMtaW1nLTFfMTc3MTQ3NDEyNTAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uSJfFL0xnnRRO-JhShMkc9votXcdfdxLkQQQIdvQk9XjZPiPZGudrsGg6Ygmz~n4~76CSE9U0JTMLRSvcJdCgvP-J~HCOP5PZ4NIHoMpHcXAJ~rbjzkHWI45Dw5y7ZqvQqZUbPO53rWzwOsS-almSytzTRDVevXnswPk4u0zvwgAHoMib4P7BXsUcykqI3R29lSFFOhwFwnYauM2ATQ6FBDYPVffzCfQDCYmWgoRcCwAbJ21SGH5Vm1QpvXTVzGlV9JiRFzZAKGuz0g10kf57Xqg0PxDdxzn2sdU2HpSzEqiFSGftTIVsQUBnH58hGHbnVlbn0fzbVY8fpA3PVYVLA__";

const COMMUNITY_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/L084l32Vn0CzxjyMV7geBH/sandbox/odBZMa5bBYVoWN5sVBha6S-img-3_1771474124000_na1fn_Y29tbXVuaXR5LXNlY3Rpb24.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTDA4NGwzMlZuMEN6eGp5TVY3Z2VCSC9zYW5kYm94L29kQlpNYTViQllWb1dONXNWQmhhNlMtaW1nLTNfMTc3MTQ3NDEyNDAwMF9uYTFmbl9ZMjl0YlhWdWFYUjVMWE5sWTNScGIyNC5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nRkP-KG7pR-5Dp-mbBQ3cWNpO5ruZOTavMNc4JxV6Gp1Ga1jb56xhlw28iEJzZGsqzdjfg1iZ7-I5yXWa-qTj5RewAvkhPBsIGblWgpWwmMsIlFJ-yJm9~WhJWjsMoBapFlRV1BnGk5jqCRjGfW2jm9PgJ0Rz~lp~409jhrg8dK49qa4UwDZD018cbDEbiuLAE2SWAAdCu7TmrbH~a37HBxsLlxSoZOE440khxSuQkj9rpgX5yywKX9YeQcKIrfXzwxJo9v5oXZkgLMkaqHYnaskDl0XDuDF~1DdAmbPqlw7BxMcOYYxP9PDoJPL6PHYBtZAumD48Cvk2PXsQuOQzA__";

const features = [
  {
    icon: BookOpen,
    title: "Curated Reading List",
    description: "100 carefully selected books across 8 domains — from macroeconomics and startup thinking to product development, marketing, and team building.",
    href: "/reading-list",
    cta: "Browse Books",
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
        {/* Dark overlay — left side heavier for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

        <div className="relative h-full flex flex-col justify-end pb-16 px-8 lg:px-16 max-w-3xl">
          <div className="animate-fade-in-up">
            <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/60 mb-4 block">
              Community Knowledge Hub
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Learn Together,<br />
              <em className="not-italic text-[oklch(0.91_0.04_80)]">Grow Further</em>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed max-w-xl mb-8">
              A curated knowledge platform for entrepreneurs and business builders. Explore our reading list, share insights, and connect with a community of serious learners.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/reading-list">
                <button className="flex items-center gap-2 bg-[oklch(0.33_0.09_155)] hover:bg-[oklch(0.28_0.09_155)] text-white px-6 py-3 text-sm font-semibold rounded-sm transition-colors duration-150">
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
      <section className="bg-[oklch(0.18_0.04_155)] text-white">
        <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center lg:text-left border-l border-white/10 pl-6 first:border-l-0 first:pl-0 lg:first:border-l lg:first:pl-6">
              <div className="font-display text-3xl font-bold text-[oklch(0.91_0.04_80)]">{stat.value}</div>
              <div className="font-mono-custom text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[oklch(0.33_0.09_155)] mb-3 block">What We Offer</span>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Everything you need to<br />accelerate your learning
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group bg-card border border-border rounded-sm p-8 hover:shadow-lg hover:border-[oklch(0.33_0.09_155)]/30 transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 bg-[oklch(0.33_0.09_155)]/10 rounded-sm flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[oklch(0.33_0.09_155)]" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{feature.description}</p>
                <Link href={feature.href}>
                  <button className="flex items-center gap-1.5 text-[oklch(0.33_0.09_155)] text-sm font-semibold group-hover:gap-2.5 transition-all duration-150">
                    {feature.cta}
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Section */}
      <section className="relative overflow-hidden">
        <img
          src={COMMUNITY_IMG}
          alt="Community collaboration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.18_0.04_155)]/85" />
        <div className="relative py-20 px-8 lg:px-16 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[oklch(0.91_0.04_80)] mb-4 block">Our Mission</span>
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
                    <Icon size={20} className="text-[oklch(0.91_0.04_80)]" />
                    <span className="text-white/80 text-sm font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
            <Link href="/community">
              <button className="flex items-center gap-2 bg-[oklch(0.91_0.04_80)] hover:bg-[oklch(0.85_0.05_80)] text-[oklch(0.18_0.04_155)] px-6 py-3 text-sm font-bold rounded-sm transition-colors duration-150">
                Join the Community
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.12_0.03_155)] text-white/50 py-10 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[oklch(0.33_0.09_155)] flex items-center justify-center">
              <BookOpen size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-white/80 text-sm">Community Knowledge Hub</span>
          </div>
          <div className="flex gap-6 text-xs font-mono-custom uppercase tracking-widest">
            <Link href="/reading-list"><span className="hover:text-white transition-colors">Reading List</span></Link>
            <Link href="/community"><span className="hover:text-white transition-colors">Community</span></Link>
            <Link href="/resources"><span className="hover:text-white transition-colors">Resources</span></Link>
          </div>
          <p className="font-mono-custom text-xs">© 2024 Community Knowledge Hub</p>
        </div>
      </footer>
    </Layout>
  );
}
