import { ThemeToggle } from "@/components/ThemeToggle";
import { Palette } from "lucide-react";

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold">Color Code Converter</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
