import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, ArrowRight } from "lucide-react";

export function CrossPromo() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-primary/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Want to fix your color palette next?</h3>
                <p className="text-muted-foreground mb-4">
                  Try <strong>Color Palette Fixer</strong> — the only tool that diagnoses your palette and gives one-click fixes in 60 seconds.
                </p>
                <Button variant="default" size="lg" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
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
