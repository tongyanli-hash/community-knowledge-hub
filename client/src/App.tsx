/*
 * DESIGN SYSTEM: Structured Clarity
 * Swiss International Typographic Style × Digital Minimalism
 * Forest green #1A5C38, crisp white, warm sand accents
 * Fraunces (display) + Inter (body) + JetBrains Mono (labels)
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ReadingList from "./pages/ReadingList";
import Community from "./pages/Community";
import Resources from "./pages/Resources";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reading-list" component={ReadingList} />
      <Route path="/community" component={Community} />
      <Route path="/resources" component={Resources} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
