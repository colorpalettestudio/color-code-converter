import { useState } from "react";
import { Check, Copy, Trash2, Edit2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ColorFormats } from "@/lib/colorUtils";

type ColorCardProps = {
  color: ColorFormats & { name: string; id: string };
  onDelete: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
};

export function ColorCard({ color, onDelete, onUpdateName }: ColorCardProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(color.name);

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSaveName = () => {
    onUpdateName(color.id, editedName.trim() || "Untitled Color");
    setIsEditingName(false);
  };

  const formats = [
    { label: "HEX", value: color.hex, key: "hex" },
    { label: "RGB", value: color.rgb, key: "rgb" },
    { label: "HSL", value: color.hsl, key: "hsl" },
    { label: "CMYK", value: color.cmyk, key: "cmyk" },
  ];

  return (
    <Card className="overflow-hidden hover-elevate">
      <div
        className="h-40 w-full"
        style={{ backgroundColor: color.hex }}
        data-testid={`color-swatch-${color.id}`}
      />
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          {isEditingName ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleSaveName}
              onKeyPress={(e) => e.key === "Enter" && handleSaveName()}
              className="h-8 text-sm font-medium"
              autoFocus
              data-testid={`input-edit-name-${color.id}`}
            />
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <h3 className="font-medium text-sm" data-testid={`text-color-name-${color.id}`}>
                {color.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsEditingName(true)}
                data-testid={`button-edit-name-${color.id}`}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(color.id)}
            data-testid={`button-delete-${color.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {formats.map((format) => (
            <div
              key={format.key}
              className="flex items-center justify-between gap-2 rounded-md border p-2 hover-elevate"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  {format.label}
                </div>
                <div
                  className="font-mono text-sm truncate"
                  data-testid={`text-${format.key}-${color.id}`}
                >
                  {format.value}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => copyToClipboard(format.value, format.key)}
                data-testid={`button-copy-${format.key}-${color.id}`}
              >
                {copiedFormat === format.key ? (
                  <Check className="h-4 w-4 text-chart-2" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
