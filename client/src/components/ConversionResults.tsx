import { useState, useRef, useEffect } from "react";
import { Copy, Check, Download, ChevronUp, ChevronDown, Palette, X, Trash2, Camera, Plus, MoreHorizontal, FileText, Image, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColorFormats } from "@/lib/colorUtils";
import { useToast } from "@/hooks/use-toast";
import { parseColorInput } from "@/lib/colorUtils";

type ConversionResultsProps = {
  colors: Array<ColorFormats & { id: string }>;
  selectedFormats: Set<string>;
  onToggleFormat: (format: string) => void;
  onExportPDF: () => void;
  onExportPNG: () => void;
  onExportASE: () => void;
  onUpdateColor: (id: string, newColor: ColorFormats) => void;
  onMoveColor: (id: string, direction: "up" | "down") => void;
  onDeleteColor: (id: string) => void;
  onClearPalette: () => void;
  onAddColor: (color: ColorFormats) => void;
};

export function ConversionResults({ 
  colors, 
  selectedFormats,
  onToggleFormat,
  onExportPDF, 
  onExportPNG,
  onExportASE,
  onUpdateColor,
  onMoveColor,
  onDeleteColor,
  onClearPalette,
  onAddColor
}: ConversionResultsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [editingColorId, setEditingColorId] = useState<string | null>(null);
  const [addColorDialogOpen, setAddColorDialogOpen] = useState(false);
  const [newColorInput, setNewColorInput] = useState("");
  const colorInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (editingColorId && colorInputRef.current) {
      colorInputRef.current.click();
    }
  }, [editingColorId]);

  const allFormats = [
    { key: "hex", label: "HEX" },
    { key: "rgb", label: "RGB" },
    { key: "hsl", label: "HSL" },
    { key: "cmyk", label: "CMYK" },
  ];

  if (colors.length === 0) {
    return (
      <section id="conversion-results" className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardContent className="py-12 text-center">
              <Palette className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">No colors converted yet</h3>
              <p className="text-sm text-muted-foreground/70">
                Enter a color code above to see instant conversions between HEX, RGB, HSL, and CMYK formats.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const visibleFormats = allFormats.filter(f => selectedFormats.has(f.key));

  const copyIndividualFormat = async (colorId: string, formatKey: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedFormat(`${colorId}-${formatKey}`);
      setTimeout(() => setCopiedFormat(null), 2000);
      toast({
        title: "Copied!",
        description: value,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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

  const generatePalettePreview = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const swatchHeight = 150;
    const colorsToShow = Math.min(colors.length, 5);
    const swatchWidth = 600 / colorsToShow;

    canvas.width = 600;
    canvas.height = swatchHeight;

    colors.slice(0, colorsToShow).forEach((color, index) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(index * swatchWidth, 0, swatchWidth, swatchHeight);
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'palette-preview.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast({
          title: "Preview created!",
          description: "Perfect for sharing on Pinterest or social media",
        });
      }
    }, 'image/png');
  };

  const handleAddColor = () => {
    const parsed = parseColorInput(newColorInput.trim());
    if (parsed) {
      onAddColor(parsed);
      setNewColorInput("");
      setAddColorDialogOpen(false);
      toast({
        title: "Color added!",
        description: "New color added to your palette",
      });
    } else {
      toast({
        title: "Invalid color",
        description: "Please enter a valid color code (HEX, RGB, HSL, or CMYK)",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 px-4 bg-muted/30" id="conversion-results">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-2 text-center" data-testid="heading-conversion-results">
          HEX to RGB, HSL & CMYK Converter Results
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Your {colors.length} color{colors.length !== 1 ? 's' : ''} converted across all formats
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {allFormats.map((format) => (
              <div key={format.key} className="flex items-center gap-2">
                <Checkbox
                  id={`format-${format.key}`}
                  checked={selectedFormats.has(format.key)}
                  onCheckedChange={() => onToggleFormat(format.key)}
                  data-testid={`checkbox-format-${format.key}`}
                />
                <Label
                  htmlFor={`format-${format.key}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {format.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {/* Add Color - Primary Action */}
            <Dialog open={addColorDialogOpen} onOpenChange={setAddColorDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="default"
                  data-testid="button-add-color"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Color
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Color</DialogTitle>
                  <DialogDescription>
                    Enter a color code in any format (HEX, RGB, HSL, or CMYK)
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="color-input">Color Code</Label>
                    <Input
                      id="color-input"
                      placeholder="e.g., #FF6F61, rgb(255, 111, 97), hsl(5, 100%, 69%)"
                      value={newColorInput}
                      onChange={(e) => setNewColorInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddColor();
                        }
                      }}
                      data-testid="input-add-color"
                      autoFocus
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddColorDialogOpen(false)} data-testid="button-cancel-add">
                    Cancel
                  </Button>
                  <Button onClick={handleAddColor} data-testid="button-confirm-add">
                    Add Color
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Copy Palette - Secondary Action */}
            <Button 
              onClick={copyEntirePalette} 
              variant="outline"
              data-testid="button-copy-entire-palette"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Palette
            </Button>

            {/* Export Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" data-testid="button-export-dropdown">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onExportPDF} data-testid="button-export-pdf">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportPNG} data-testid="button-export-png">
                  <Image className="h-4 w-4 mr-2" />
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportASE} data-testid="button-export-ase">
                  <Wrench className="h-4 w-4 mr-2" />
                  Export as Adobe (.ase)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={generatePalettePreview} data-testid="button-palette-preview">
                  <Camera className="h-4 w-4 mr-2" />
                  Preview Snapshot
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Actions Dropdown */}
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" data-testid="button-more-actions">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem data-testid="button-clear-palette" onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Palette
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all colors?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all {colors.length} color{colors.length !== 1 ? 's' : ''} from your palette. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-testid="button-cancel-clear">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onClearPalette}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-testid="button-confirm-clear"
                  >
                    Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                      <Input
                        ref={editingColorId === color.id ? colorInputRef : null}
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleColorEdit(color.id, e.target.value)}
                        onBlur={() => setEditingColorId(null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        data-testid={`input-color-picker-${color.id}`}
                      />
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={() => onMoveColor(color.id, "up")}
                        disabled={index === 0}
                        data-testid={`button-move-up-${color.id}`}
                        title="Move up"
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={() => onMoveColor(color.id, "down")}
                        disabled={index === colors.length - 1}
                        data-testid={`button-move-down-${color.id}`}
                        title="Move down"
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => onDeleteColor(color.id)}
                        data-testid={`button-delete-${color.id}`}
                        title="Delete color"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`grid gap-x-6 gap-y-2 font-mono text-sm`} style={{ gridTemplateColumns: `repeat(${Math.min(visibleFormats.length, 2)}, 1fr)` }}>
                    {visibleFormats.map((format) => {
                      const key = format.key as keyof ColorFormats;
                      const formatId = `${color.id}-${format.key}`;
                      const isCopied = copiedFormat === formatId;
                      return (
                        <div key={format.key}>
                          <span className="text-xs text-muted-foreground uppercase font-medium block mb-1">
                            {format.label}
                          </span>
                          <span 
                            onClick={() => copyIndividualFormat(color.id, format.key, color[key])}
                            className="cursor-pointer hover-elevate active-elevate-2 px-2 py-1 -mx-2 -my-1 rounded inline-block transition-colors"
                            data-testid={`${format.key}-${color.id}`}
                            title="Click to copy"
                          >
                            {isCopied ? (
                              <span className="inline-flex items-center gap-1">
                                <Check className="h-3 w-3 text-chart-2" />
                                {color[key]}
                              </span>
                            ) : (
                              color[key]
                            )}
                          </span>
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
