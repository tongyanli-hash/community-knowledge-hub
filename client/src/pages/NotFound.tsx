import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
        <div className="part-number-watermark mb-4">404</div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground text-sm max-w-sm mb-8">
          The page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
        <div className="flex gap-3">
          <Link href="/">
            <button className="flex items-center gap-2 bg-[oklch(0.51_0.22_264)] text-white px-5 py-2.5 text-sm font-semibold rounded-sm hover:bg-[oklch(0.44_0.20_264)] transition-colors">
              <ArrowLeft size={14} />
              Back to Home
            </button>
          </Link>
          <Link href="/reading-list">
            <button className="flex items-center gap-2 border border-border text-foreground px-5 py-2.5 text-sm font-semibold rounded-sm hover:bg-muted transition-colors">
              <BookOpen size={14} />
              Reading List
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
