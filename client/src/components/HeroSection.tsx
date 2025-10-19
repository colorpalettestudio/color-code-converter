import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parseColorInput, type ColorFormats } from "@/lib/colorUtils";
import { parseStudioCode } from "@/lib/studioCodeParser";
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

    const trimmedInput = inputValue.trim();
    const converted: Array<ColorFormats & { id: string }> = [];

    // Check if input is studio code
    if (trimmedInput.toLowerCase().includes('studiocode') || 
        (trimmedInput.includes('colorNames=') && trimmedInput.includes('%'))) {
      try {
        const hexColors = parseStudioCode(trimmedInput);
        hexColors.forEach((hex, index) => {
          const parsed = parseColorInput(hex);
          if (parsed) {
            converted.push({ ...parsed, id: `${Date.now()}-${index}` });
          }
        });

        if (converted.length > 0) {
          onConvert(converted);
          toast({
            title: "Studio code imported!",
            description: `${converted.length} color${converted.length > 1 ? "s" : ""} imported successfully`,
          });
          return;
        }
      } catch (error) {
        // If studio code parsing fails, fall through to regular parsing
        console.log('Not valid studio code, trying regular parsing');
      }
    }

    // Regular color code parsing
    // Smart split: split on newlines, or commas that are NOT inside parentheses
    const lines: string[] = [];
    let currentLine = '';
    let parenDepth = 0;
    
    for (let i = 0; i < trimmedInput.length; i++) {
      const char = trimmedInput[i];
      
      if (char === '(') {
        parenDepth++;
        currentLine += char;
      } else if (char === ')') {
        parenDepth--;
        currentLine += char;
      } else if (char === '\n') {
        // Always split on newlines
        if (currentLine.trim()) {
          lines.push(currentLine.trim());
        }
        currentLine = '';
      } else if (char === ',' && parenDepth === 0) {
        // Only split on commas outside of parentheses
        if (currentLine.trim()) {
          lines.push(currentLine.trim());
        }
        currentLine = '';
      } else {
        currentLine += char;
      }
    }
    
    // Don't forget the last line
    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }
    
    // Helper function to extract RGB values from rgb string
    const extractRGB = (rgbString: string): [number, number, number] | null => {
      const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
      return null;
    };

    // Helper function to check if two colors are very similar (within threshold)
    const areColorsSimilar = (rgb1: [number, number, number], rgb2: [number, number, number], threshold = 2): boolean => {
      return Math.abs(rgb1[0] - rgb2[0]) <= threshold &&
             Math.abs(rgb1[1] - rgb2[1]) <= threshold &&
             Math.abs(rgb1[2] - rgb2[2]) <= threshold;
    };

    // Deduplicate colors by RGB similarity (to handle CMYK rounding issues)
    const seenColors: Array<{ rgb: [number, number, number], color: ColorFormats }> = [];
    
    lines.forEach((line, index) => {
      const parsed = parseColorInput(line);
      if (parsed) {
        const rgb = extractRGB(parsed.rgb);
        if (rgb) {
          // Check if this color is similar to any we've already seen
          const isDuplicate = seenColors.some(seen => areColorsSimilar(seen.rgb, rgb));
          
          if (!isDuplicate) {
            seenColors.push({ rgb, color: parsed });
            converted.push({ ...parsed, id: `${Date.now()}-${index}` });
          }
        }
      }
    });

    if (converted.length === 0) {
      toast({
        title: "No valid colors found",
        description: "Please enter valid color codes (HEX, RGB, HSL, CMYK) or studio code",
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
          Free, Instant & No Sign-Up Needed
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight" data-testid="text-hero-title">
          Convert All Your <span className="gradient-text">Color Codes</span> Instantly
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Drop in your HEX, RGB, HSL, or CMYK values — get every format at once, ready to copy or export as a palette.
        </p>

        <div className="mb-8">
          <Textarea
            placeholder="Enter colors (one per line or comma-separated)&#10;Examples: #FF6F61, rgb(255, 111, 97), hsl(5, 100%, 69%)&#10;&#10;☺ Tip: You can also paste studio code directly here!"
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
          <span>☺ Free & Instant</span>
          <span>☺ Export to PNG / PDF / Adobe</span>
          <span>☺ No sign-up required</span>
        </div>
      </div>
    </section>
  );
}
