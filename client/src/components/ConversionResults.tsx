import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ColorFormats } from "@/lib/colorUtils";
import { useToast } from "@/hooks/use-toast";

type ConversionResultsProps = {
  colors: Array<ColorFormats & { id: string }>;
  onExportPDF: () => void;
  onExportPNG: () => void;
};

export function ConversionResults({ colors, onExportPDF, onExportPNG }: ConversionResultsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  if (colors.length === 0) return null;

  const copyAllFormats = async (color: ColorFormats & { id: string }) => {
    const allFormats = `${color.hex}\n${color.rgb}\n${color.hsl}\n${color.cmyk}`;
    
    try {
      await navigator.clipboard.writeText(allFormats);
      setCopiedId(color.id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied!",
        description: "All formats copied to clipboard",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="py-12 px-4 bg-muted/30" id="results">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold">
            Conversion Results ({colors.length})
          </h2>
          <div className="flex gap-3">
            <Button onClick={onExportPDF} variant="default" data-testid="button-export-pdf-main">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={onExportPNG} variant="secondary" data-testid="button-export-png-main">
              <Download className="h-4 w-4 mr-2" />
              Export PNG
            </Button>
          </div>
        </div>

        <div className="grid gap-4" id="color-palette-export">
          {colors.map((color) => (
            <Card key={color.id} className="hover-elevate">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 items-center">
                  <div
                    className="h-24 md:h-20 rounded-md border"
                    style={{ backgroundColor: color.hex }}
                    data-testid={`swatch-${color.id}`}
                  />
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-sm">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-medium block mb-1">HEX</span>
                      <span data-testid={`hex-${color.id}`}>{color.hex}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-medium block mb-1">RGB</span>
                      <span data-testid={`rgb-${color.id}`}>{color.rgb}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-medium block mb-1">HSL</span>
                      <span data-testid={`hsl-${color.id}`}>{color.hsl}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-medium block mb-1">CMYK</span>
                      <span data-testid={`cmyk-${color.id}`}>{color.cmyk}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => copyAllFormats(color)}
                    variant="default"
                    data-testid={`button-copy-all-${color.id}`}
                  >
                    {copiedId === color.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
