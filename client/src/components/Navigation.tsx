import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Home, BookOpen } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Converter", icon: Home, testId: "link-home" },
    { href: "/about", label: "About", icon: BookOpen, testId: "link-about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                data-testid={link.testId}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
