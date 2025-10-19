import { Palette } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Built by The Color Palette Studio
            </span>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© {new Date().getFullYear()} Color Code Converter. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
