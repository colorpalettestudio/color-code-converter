import { Palette } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <Palette className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight" data-testid="text-app-title">
              Color Code Converter
            </h1>
            <p className="text-xs text-muted-foreground">
              Transform brand colors instantly
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
