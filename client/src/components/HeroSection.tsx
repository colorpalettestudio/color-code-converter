import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parseColorInput, type ColorFormats } from "@/lib/colorUtils";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type HeroSectionProps = {
  onConvert: (colors: Array<ColorFormats & { id: string }>) => void;
};

export function HeroSection({ onConvert }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleConvert = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Enter color codes",
        description: "Please enter at least one color code",
        variant: "destructive",
      });
      return;
    }

    const lines = inputValue.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    const converted: Array<ColorFormats & { id: string }> = [];

    lines.forEach((line, index) => {
      const parsed = parseColorInput(line);
      if (parsed) {
        converted.push({ ...parsed, id: `${Date.now()}-${index}` });
      }
    });

    if (converted.length === 0) {
      toast({
        title: "No valid colors found",
        description: "Please enter valid color codes (HEX, RGB, HSL, or CMYK)",
        variant: "destructive",
      });
      return;
    }

    onConvert(converted);
    
    toast({
      title: "Colors converted!",
      description: `${converted.length} color${converted.length > 1 ? "s" : ""} successfully converted`,
    });
  };

  const loadSampleColors = () => {
    setInputValue("#FF6F61\n#FFD166\n#06D6A0\n#118AB2\n#073B4C");
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium" data-testid="badge-free-instant">
          🆓 Free, Instant & No Sign-Up Needed
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" data-testid="text-hero-title">
          Convert All Your Color Codes Instantly
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Drop in your HEX, RGB, HSL, or CMYK values — get every format at once, ready to copy or export as a palette.
        </p>

        <div className="mb-8">
          <Textarea
            placeholder="Enter colors (one per line or comma-separated)&#10;Examples: #FF6F61, rgb(255, 111, 97), hsl(5, 100%, 69%)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-h-32 font-mono text-base mb-4"
            data-testid="input-color-bulk"
          />
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={handleConvert} data-testid="button-convert">
              Convert
            </Button>
            <Button size="lg" variant="outline" onClick={loadSampleColors} data-testid="button-sample">
              <Sparkles className="h-4 w-4 mr-2" />
              Try sample colors
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>⚡ Free & Instant</span>
          <span>💾 Export to PNG / PDF / Adobe</span>
          <span>🔒 No sign-up required</span>
        </div>
      </div>
    </section>
  );
}
