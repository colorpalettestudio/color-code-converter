import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import paletteFixerImage from "@assets/2_1760881467120.png";

export function CrossPromo() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={paletteFixerImage} 
                  alt="Color Palette Fixer Tool" 
                  className="w-48 h-auto rounded-lg border border-border shadow-md"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Want to fix your color palette next?</h3>
                <p className="text-muted-foreground mb-4">
                  Try <strong>Color Palette Fixer</strong> — the only tool that diagnoses your palette and gives one-click fixes in 60 seconds.
                </p>
                <Button variant="default" size="lg" asChild>
                  <a href="https://thecolorpalettestudio.com/products/color-palette-fixer" target="_blank" rel="noopener noreferrer">
                    Try Palette Fixer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
