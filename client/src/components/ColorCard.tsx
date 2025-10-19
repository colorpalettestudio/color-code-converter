import { useState } from "react";
import { Check, Copy, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColorFormats } from "@/lib/colorUtils";
import { useToast } from "@/hooks/use-toast";

type ColorCardProps = {
  color: ColorFormats & { id: string };
  onDelete: (id: string) => void;
};

export function ColorCard({ color, onDelete }: ColorCardProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(
    new Set(["hex", "rgb", "hsl"])
  );
  const { toast } = useToast();

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const copySelectedFormats = async () => {
    const formats = [
      { key: "hex", value: color.hex },
      { key: "rgb", value: color.rgb },
      { key: "hsl", value: color.hsl },
      { key: "cmyk", value: color.cmyk },
    ];

    const selectedValues = formats
      .filter((f) => selectedFormats.has(f.key))
      .map((f) => f.value)
      .join("\n");

    if (selectedValues) {
      try {
        await navigator.clipboard.writeText(selectedValues);
        toast({
          title: "Copied!",
          description: `${selectedFormats.size} format${selectedFormats.size > 1 ? "s" : ""} copied to clipboard`,
        });
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const toggleFormat = (format: string) => {
    const newSelected = new Set(selectedFormats);
    if (newSelected.has(format)) {
      newSelected.delete(format);
    } else {
      newSelected.add(format);
    }
    setSelectedFormats(newSelected);
  };

  const formats = [
    { label: "HEX", value: color.hex, key: "hex" },
    { label: "RGB", value: color.rgb, key: "rgb" },
    { label: "HSL", value: color.hsl, key: "hsl" },
    { label: "CMYK", value: color.cmyk, key: "cmyk" },
  ];

  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="flex">
        <div
          className="w-24 flex-shrink-0"
          style={{ backgroundColor: color.hex }}
          data-testid={`color-swatch-${color.id}`}
        />
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 space-y-2">
              {formats.map((format) => (
                <div
                  key={format.key}
                  className="flex items-center gap-3"
                >
                  <Checkbox
                    id={`${color.id}-${format.key}`}
                    checked={selectedFormats.has(format.key)}
                    onCheckedChange={() => toggleFormat(format.key)}
                    data-testid={`checkbox-${format.key}-${color.id}`}
                  />
                  <label
                    htmlFor={`${color.id}-${format.key}`}
                    className="flex-1 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-xs font-medium text-muted-foreground uppercase w-12">
                        {format.label}
                      </span>
                      <span
                        className="font-mono text-sm flex-1 truncate"
                        data-testid={`text-${format.key}-${color.id}`}
                      >
                        {format.value}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 flex-shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        copyToClipboard(format.value, format.key);
                      }}
                      data-testid={`button-copy-${format.key}-${color.id}`}
                    >
                      {copiedFormat === format.key ? (
                        <Check className="h-3 w-3 text-chart-2" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={copySelectedFormats}
                disabled={selectedFormats.size === 0}
                data-testid={`button-copy-selected-${color.id}`}
              >
                <Copy className="h-3 w-3 mr-2" />
                Copy Selected
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive hover:text-destructive"
                onClick={() => onDelete(color.id)}
                data-testid={`button-delete-${color.id}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
