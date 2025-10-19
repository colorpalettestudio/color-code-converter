import { Palette, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-12 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-primary" />
              <span className="font-semibold">Color Palette Studio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free tools for designers and developers to work with colors effortlessly.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">More Free Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-palette-fixer">
                  Color Palette Fixer
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-gradient-generator">
                  Gradient Generator
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-contrast-checker">
                  Contrast Checker
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-palette-from-image">
                  Extract Palette from Image
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-color-theory">
                  Color Theory Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-brand-colors">
                  Popular Brand Colors
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-blog">
                  Blog & Tutorials
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Color Code Converter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
