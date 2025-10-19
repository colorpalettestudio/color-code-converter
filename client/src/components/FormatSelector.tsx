import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type FormatSelectorProps = {
  selectedFormats: Set<string>;
  onToggleFormat: (format: string) => void;
};

export function FormatSelector({ selectedFormats, onToggleFormat }: FormatSelectorProps) {
  const formats = [
    { key: "hex", label: "HEX" },
    { key: "rgb", label: "RGB" },
    { key: "hsl", label: "HSL" },
    { key: "cmyk", label: "CMYK" },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-sm font-medium">Show formats:</span>
          {formats.map((format) => (
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
      </CardContent>
    </Card>
  );
}
