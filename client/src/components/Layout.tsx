/*
 * DESIGN SYSTEM: Warm & Welcoming
 * Layout: Fixed left sidebar (240px) + main content area
 * Sidebar: Deep walnut/espresso background, warm amber accent on active items
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Home, Users, Archive, Menu, X, ChevronRight, Database, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/reading-list", label: "Reading List", icon: BookOpen },
  { href: "/domains", label: "Knowledge Domains", icon: Database },
  { href: "/community", label: "Community", icon: Users },
  { href: "/resources", label: "Resources", icon: Archive },
];

const domainSubItems = [
  { href: "/domains/data-engineering", label: "Data Engineering" },
];

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function Layout({ children, fullWidth = false }: LayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [domainsExpanded, setDomainsExpanded] = useState(location.startsWith("/domains"));

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-sidebar text-sidebar-foreground fixed top-0 left-0 h-full z-40">
        {/* Logo / Brand */}
        <div className="px-6 pt-8 pb-6 border-b border-sidebar-border">
          <Link href="/">
            <div className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center shrink-0">
                <BookOpen size={16} className="text-sidebar-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-sm leading-tight text-sidebar-foreground">
                  Knowledge Hub
                </div>
                <div className="font-mono-custom text-[10px] text-sidebar-foreground/50 tracking-widest uppercase">
                  Community
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? location === "/" : location.startsWith(item.href);
            const Icon = item.icon;
            const isDomains = item.href === "/domains";
            return (
              <div key={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-150 group cursor-pointer",
                    isActive
                      ? "bg-sidebar-accent border-l-[3px] border-sidebar-primary text-sidebar-foreground pl-[calc(0.75rem-3px)]"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                  onClick={() => isDomains && setDomainsExpanded((p) => !p)}
                >
                  {isDomains ? (
                    <>
                      <Icon size={16} className={cn(isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80")} />
                      <Link href={item.href} className="flex-1"><span>{item.label}</span></Link>
                      <ChevronRight size={12} className={cn("ml-auto transition-transform duration-200", domainsExpanded && "rotate-90", isActive ? "text-sidebar-primary/60" : "text-sidebar-foreground/30")} />
                    </>
                  ) : (
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <Icon size={16} className={cn(isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80")} />
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight size={12} className="ml-auto text-sidebar-primary/60" />}
                    </Link>
                  )}
                </div>
                {isDomains && domainsExpanded && (
                  <div className="ml-6 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-3">
                    {domainSubItems.map((sub) => {
                      const isSubActive = location === sub.href;
                      return (
                        <Link key={sub.href} href={sub.href}>
                          <div className={cn("flex items-center gap-2 px-2 py-2 rounded-sm text-xs font-medium transition-colors", isSubActive ? "text-sidebar-foreground bg-sidebar-accent" : "text-sidebar-foreground/55 hover:text-sidebar-foreground hover:bg-sidebar-accent/40")}>
                            <Database size={11} className={isSubActive ? "text-sidebar-primary" : "text-sidebar-foreground/40"} />
                            {sub.label}
                          </div>
                        </Link>
                      );
                    })}
                    <div className="flex items-center gap-2 px-2 py-2 text-xs text-sidebar-foreground/30">
                      <Globe size={11} className="text-sidebar-foreground/20" />
                      More coming soon
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-sidebar-border">
          <p className="font-mono-custom text-[10px] text-sidebar-foreground/30 uppercase tracking-widest">
            Est. 2024
          </p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-sidebar text-sidebar-foreground flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-sidebar-primary flex items-center justify-center">
              <BookOpen size={14} className="text-sidebar-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm text-sidebar-foreground">Knowledge Hub</span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded text-sidebar-foreground/70 hover:text-sidebar-foreground"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-sidebar/95 pt-14" onClick={() => setMobileOpen(false)}>
          <nav className="px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? location === "/" : location.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn("flex items-center gap-3 px-4 py-3 rounded text-base font-medium", isActive ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/70")}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
            <div className="ml-4 pl-4 border-l border-sidebar-border space-y-1">
              {domainSubItems.map((sub) => (
                <Link key={sub.href} href={sub.href}>
                  <div className="flex items-center gap-2 px-3 py-2 rounded text-sm text-sidebar-foreground/60">
                    <Database size={13} />{sub.label}
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1 min-h-screen",
        "lg:ml-60",
        "pt-14 lg:pt-0"
      )}>
        <div className={fullWidth ? "w-full" : ""}>
          {children}
        </div>
      </main>
    </div>
  );
}
