import { useState } from "react";
import { Copy, Check, Download, ChevronUp, ChevronDown, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ColorFormats } from "@/lib/colorUtils";
import { useToast } from "@/hooks/use-toast";
import { parseColorInput } from "@/lib/colorUtils";

type ConversionResultsProps = {
  colors: Array<ColorFormats & { id: string }>;
  selectedFormats: Set<string>;
  onExportPDF: () => void;
  onExportPNG: () => void;
  onExportASE: () => void;
  onUpdateColor: (id: string, newColor: ColorFormats) => void;
  onMoveColor: (id: string, direction: "up" | "down") => void;
};

export function ConversionResults({ 
  colors, 
  selectedFormats,
  onExportPDF, 
  onExportPNG,
  onExportASE,
  onUpdateColor,
  onMoveColor
}: ConversionResultsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingColorId, setEditingColorId] = useState<string | null>(null);
  const { toast } = useToast();

  if (colors.length === 0) return null;

  const allFormats = [
    { key: "hex", label: "HEX" },
    { key: "rgb", label: "RGB" },
    { key: "hsl", label: "HSL" },
    { key: "cmyk", label: "CMYK" },
  ];

  const visibleFormats = allFormats.filter(f => selectedFormats.has(f.key));

  const copyAllFormats = async (color: ColorFormats & { id: string }) => {
    const formatsToCopy = visibleFormats.map(f => {
      const key = f.key as keyof ColorFormats;
      return color[key];
    }).join("\n");
    
    try {
      await navigator.clipboard.writeText(formatsToCopy);
      setCopiedId(color.id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied!",
        description: `${visibleFormats.length} format${visibleFormats.length > 1 ? "s" : ""} copied to clipboard`,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const copyEntirePalette = async () => {
    const paletteText = colors.map(color => {
      const formats = visibleFormats.map(f => {
        const key = f.key as keyof ColorFormats;
        return `${f.label}: ${color[key]}`;
      }).join("\n");
      return formats;
    }).join("\n\n");

    try {
      await navigator.clipboard.writeText(paletteText);
      toast({
        title: "Palette copied!",
        description: `${colors.length} colors copied to clipboard`,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleColorEdit = (colorId: string, newValue: string) => {
    const parsed = parseColorInput(newValue);
    if (parsed) {
      onUpdateColor(colorId, parsed);
      setEditingColorId(null);
      toast({
        title: "Color updated!",
        description: "Your color has been updated",
      });
    } else {
      toast({
        title: "Invalid color",
        description: "Please enter a valid color code",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 px-4 bg-muted/30" id="results">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold">
            Conversion Results ({colors.length})
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              onClick={copyEntirePalette} 
              variant="default"
              data-testid="button-copy-entire-palette"
            >
              <Palette className="h-4 w-4 mr-2" />
              Copy Entire Palette
            </Button>
            <Button onClick={onExportPDF} variant="secondary" data-testid="button-export-pdf-main">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button onClick={onExportPNG} variant="secondary" data-testid="button-export-png-main">
              <Download className="h-4 w-4 mr-2" />
              PNG
            </Button>
            <Button onClick={onExportASE} variant="secondary" data-testid="button-export-ase-main">
              <Download className="h-4 w-4 mr-2" />
              Adobe (.ase)
            </Button>
          </div>
        </div>

        <div className="grid gap-4" id="color-palette-export">
          {colors.map((color, index) => (
            <Card key={color.id} className="hover-elevate">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 items-center">
                  <div className="relative group">
                    <div
                      className="h-24 md:h-20 rounded-md border cursor-pointer relative overflow-hidden"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setEditingColorId(color.id)}
                      data-testid={`swatch-${color.id}`}
                      title="Click to edit color"
                    >
                      {editingColorId === color.id && (
                        <Input
                          type="color"
                          defaultValue={color.hex}
                          onChange={(e) => handleColorEdit(color.id, e.target.value)}
                          onBlur={() => setEditingColorId(null)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          autoFocus
                          data-testid={`input-color-picker-${color.id}`}
                        />
                      )}
                    </div>
                    <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-6 w-6"
                        onClick={() => onMoveColor(color.id, "up")}
                        disabled={index === 0}
                        data-testid={`button-move-up-${color.id}`}
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-6 w-6"
                        onClick={() => onMoveColor(color.id, "down")}
                        disabled={index === colors.length - 1}
                        data-testid={`button-move-down-${color.id}`}
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`grid gap-x-6 gap-y-2 font-mono text-sm`} style={{ gridTemplateColumns: `repeat(${Math.min(visibleFormats.length, 2)}, 1fr)` }}>
                    {visibleFormats.map((format) => {
                      const key = format.key as keyof ColorFormats;
                      return (
                        <div key={format.key}>
                          <span className="text-xs text-muted-foreground uppercase font-medium block mb-1">
                            {format.label}
                          </span>
                          <span data-testid={`${format.key}-${color.id}`}>{color[key]}</span>
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    onClick={() => copyAllFormats(color)}
                    variant="default"
                    disabled={visibleFormats.length === 0}
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
