import { Palette, ExternalLink, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <p className="text-sm text-muted-foreground mb-4">
              Free tools for designers and developers to work with colors effortlessly.
            </p>
            <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by{" "}
              <a 
                href="https://thecolorpalettestudio.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
                data-testid="link-main-website"
              >
                Color Palette Studio
              </a>
            </p>
            <Button variant="default" size="sm" asChild>
              <a href="https://thecolorpalettestudio.com/" target="_blank" rel="noopener noreferrer" data-testid="button-visit-website">
                Explore More Tools
                <ArrowRight className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">More Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://thecolorpalettestudio.com/products/color-palette-fixer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-palette-fixer">
                  Color Palette Fixer
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://thecolorpalettestudio.com/pages/free-color-contrast-checker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-contrast-checker">
                  Contrast Checker
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://thecolorpalettestudio.com/pages/live-workshop-how-to-fix-a-color-palette" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-free-workshop">
                  Free Workshop
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@color.palette.studio/videos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-videos">
                  Videos
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://thecolorpalettestudio.com/pages/contact" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1" data-testid="link-contact">
                  Contact
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Color Palette Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
