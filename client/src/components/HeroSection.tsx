import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { parseColorInput, type ColorFormats } from "@/lib/colorUtils";
import { parseStudioCode } from "@/lib/studioCodeParser";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type HeroSectionProps = {
  onConvert: (colors: Array<ColorFormats & { id: string }>) => void;
};

export function HeroSection({ onConvert }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState("");
  const [studioCode, setStudioCode] = useState("");
  const [isStudioDialogOpen, setIsStudioDialogOpen] = useState(false);
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

  const handleStudioCodeImport = () => {
    try {
      const hexColors = parseStudioCode(studioCode);
      const converted: Array<ColorFormats & { id: string }> = [];

      hexColors.forEach((hex, index) => {
        const parsed = parseColorInput(hex);
        if (parsed) {
          converted.push({ ...parsed, id: `${Date.now()}-${index}` });
        }
      });

      if (converted.length === 0) {
        toast({
          title: "No valid colors found",
          description: "Could not extract colors from studio code",
          variant: "destructive",
        });
        return;
      }

      onConvert(converted);
      setIsStudioDialogOpen(false);
      setStudioCode("");
      
      toast({
        title: "Studio code imported!",
        description: `${converted.length} color${converted.length > 1 ? "s" : ""} imported successfully`,
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Invalid studio code format",
        variant: "destructive",
      });
    }
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
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent" data-testid="text-hero-title">
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
            
            <Dialog open={isStudioDialogOpen} onOpenChange={setIsStudioDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" data-testid="button-studio-code">
                  <Code2 className="h-4 w-4 mr-2" />
                  Import Studio Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import from Studio Code</DialogTitle>
                  <DialogDescription>
                    Paste your studio code from Color Palette Fixer or other Color Palette Studio apps
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Paste studio code here (e.g., studiocode?dataStyleName=...)"
                    value={studioCode}
                    onChange={(e) => setStudioCode(e.target.value)}
                    className="font-mono text-sm"
                    data-testid="input-studio-code"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsStudioDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleStudioCodeImport} data-testid="button-import-studio">
                      Import Colors
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
