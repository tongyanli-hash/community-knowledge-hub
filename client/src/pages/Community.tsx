/*
 * DESIGN SYSTEM: Warm & Welcoming
 * Community page: Discussion topics, member activity, upcoming events
 */

import Layout from "@/components/Layout";
import { MessageSquare, Users, Calendar, ArrowRight, ThumbsUp, Clock } from "lucide-react";
import { toast } from "sonner";

const discussions = [
  {
    title: "Key takeaways from 《从0到1》— applying Zero to One principles in the Chinese market",
    category: "创业思维",
    replies: 24,
    likes: 47,
    time: "2 hours ago",
    author: "张明",
    excerpt: "Peter Thiel's framework for building monopolies is fascinating, but how does it translate to China's highly competitive landscape? I've been thinking about vertical integration vs horizontal expansion...",
  },
  {
    title: "How to read financial statements as a non-finance founder — notes from 《手把手教你读财报》",
    category: "财务金融",
    replies: 18,
    likes: 35,
    time: "5 hours ago",
    author: "李华",
    excerpt: "After reading Tang Chao's book, I finally understand the relationship between the three financial statements. Here are my notes on the most important ratios for early-stage companies...",
  },
  {
    title: "OKR implementation lessons learned — what worked and what didn't",
    category: "团队建设",
    replies: 31,
    likes: 62,
    time: "1 day ago",
    author: "王芳",
    excerpt: "We've been running OKRs for 6 months now. The books make it sound straightforward, but the reality is much messier. Here's what I wish I'd known before we started...",
  },
  {
    title: "Discussion: Is the positioning framework from 《定位》still relevant in the age of social media?",
    category: "营销定位",
    replies: 42,
    likes: 89,
    time: "2 days ago",
    author: "陈伟",
    excerpt: "Al Ries wrote Positioning in 1981. Social media has fundamentally changed how brands communicate. Is the core framework still valid, or do we need a new model?",
  },
  {
    title: "Reading group: 《增长黑客》— Chapter 4-6 discussion",
    category: "增长流量",
    replies: 15,
    likes: 28,
    time: "3 days ago",
    author: "刘洋",
    excerpt: "This week we covered the activation and retention chapters. The AARRR framework is well-known, but Sean Ellis goes much deeper on the mechanics of each stage...",
  },
];

const upcomingEvents = [
  {
    title: "Monthly Book Club: 《精益创业》",
    date: "Feb 25, 2024",
    time: "7:00 PM CST",
    attendees: 28,
    type: "Online",
  },
  {
    title: "Workshop: Financial Modeling for Startups",
    date: "Mar 2, 2024",
    time: "2:00 PM CST",
    attendees: 15,
    type: "Hybrid",
  },
  {
    title: "Speaker Session: Fundraising in 2024",
    date: "Mar 10, 2024",
    time: "3:00 PM CST",
    attendees: 45,
    type: "Online",
  },
];

const categoryColors: Record<string, string> = {
  "创业思维": "bg-emerald-50 text-emerald-700",
  "财务金融": "bg-blue-50 text-blue-700",
  "团队建设": "bg-amber-50 text-amber-700",
  "营销定位": "bg-rose-50 text-rose-700",
  "增长流量": "bg-violet-50 text-violet-700",
};

export default function Community() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[oklch(0.24_0.05_48)] to-[oklch(0.32_0.06_52)] px-8 py-12">
        <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-white/40 mb-2 block">Connect & Learn</span>
        <h1 className="font-display text-4xl font-bold text-white mb-3">Community</h1>
        <p className="text-white/60 text-sm max-w-xl">
          Share insights, discuss books, and learn from fellow entrepreneurs and business builders.
        </p>
      </div>

      <div className="px-8 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main: Discussions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">Recent Discussions</h2>
              <button
                onClick={() => toast.info("Feature coming soon — full discussion board is in development.")}
                className="flex items-center gap-1.5 text-sm font-semibold text-[oklch(0.56_0.14_58)] hover:underline"
              >
                View all
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="space-y-4">
              {discussions.map((disc, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-5 hover:border-[oklch(0.78_0.12_65)]/60 hover:shadow-[0_3px_16px_oklch(0.56_0.14_58/0.10)] transition-all duration-150 cursor-pointer group animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
                  onClick={() => toast.info("Feature coming soon — full discussion board is in development.")}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-mono-custom font-medium uppercase tracking-wide ${categoryColors[disc.category] || 'bg-gray-50 text-gray-600'}`}>
                          {disc.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 group-hover:text-[oklch(0.56_0.14_58)] transition-colors">
                        {disc.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                        {disc.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/70">{disc.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {disc.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={11} />
                          {disc.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={11} />
                          {disc.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Start Discussion CTA */}
            <div className="mt-6 p-5 bg-[oklch(0.56_0.14_58)]/5 border border-[oklch(0.78_0.12_65)]/40 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[oklch(0.56_0.14_58)]/20 flex items-center justify-center">
                  <MessageSquare size={14} className="text-[oklch(0.56_0.14_58)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Start a new discussion</p>
                  <p className="text-xs text-muted-foreground">Share your thoughts on a book or topic</p>
                </div>
                <button
                  onClick={() => toast.info("Feature coming soon — discussion posting is in development.")}
                  className="bg-[oklch(0.56_0.14_58)] text-white px-4 py-2 text-xs font-semibold rounded-sm hover:bg-[oklch(0.50_0.13_58)] transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Events + Stats */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-display text-base font-bold text-foreground mb-4">Community Stats</h3>
              <div className="space-y-3">
                {[
                  { icon: Users, label: "Members", value: "500+" },
                  { icon: MessageSquare, label: "Discussions", value: "1,240" },
                  { icon: Calendar, label: "Events Hosted", value: "48" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon size={14} className="text-[oklch(0.56_0.14_58)]" />
                        {stat.label}
                      </div>
                      <span className="font-display font-bold text-foreground">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-bold text-foreground">Upcoming Events</h3>
                <button
                  onClick={() => toast.info("Feature coming soon — full events calendar is in development.")}
                  className="text-xs text-[oklch(0.56_0.14_58)] hover:underline font-medium"
                >
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, i) => (
                  <div
                    key={i}
                    className="cursor-pointer group"
                    onClick={() => toast.info("Feature coming soon — event registration is in development.")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[oklch(0.56_0.14_58)]/10 rounded-sm flex flex-col items-center justify-center shrink-0">
                        <span className="font-mono-custom text-[10px] text-[oklch(0.56_0.14_58)] font-bold leading-none">
                          {event.date.split(" ")[1].replace(",", "")}
                        </span>
                        <span className="font-mono-custom text-[9px] text-[oklch(0.56_0.14_58)]/70 uppercase">
                          {event.date.split(" ")[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground leading-snug group-hover:text-[oklch(0.56_0.14_58)] transition-colors">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono-custom text-[10px] text-muted-foreground">{event.time}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                          <span className="font-mono-custom text-[10px] text-muted-foreground">{event.type}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Users size={10} className="text-muted-foreground" />
                          <span className="font-mono-custom text-[10px] text-muted-foreground">{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                    {i < upcomingEvents.length - 1 && <div className="border-b border-border mt-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Join CTA */}
            <div className="bg-gradient-to-br from-[oklch(0.24_0.05_48)] to-[oklch(0.32_0.06_52)] text-white rounded-xl p-5">
              <h3 className="font-display text-base font-bold mb-2">Join the Community</h3>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                Connect with 500+ entrepreneurs and business builders. Share your reading journey and grow together.
              </p>
              <button
                onClick={() => toast.info("Feature coming soon — membership registration is in development.")}
                className="w-full bg-[oklch(0.88_0.06_75)] text-[oklch(0.24_0.05_48)] py-2.5 text-sm font-bold rounded-sm hover:bg-[oklch(0.85_0.05_80)] transition-colors"
              >
                Apply for Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
