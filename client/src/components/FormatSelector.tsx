import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ListFilter, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const selectedCount = selectedFormats.size;
  const totalCount = formats.length;

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            data-testid="button-show-formats"
          >
            <ListFilter className="h-4 w-4 mr-2" />
            Show Formats ({selectedCount}/{totalCount})
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48">
          {formats.map((format) => (
            <DropdownMenuItem
              key={format.key}
              onSelect={(e) => {
                e.preventDefault();
                onToggleFormat(format.key);
              }}
              data-testid={`checkbox-format-${format.key}`}
              className="flex items-center justify-between cursor-pointer"
            >
              <span>{format.label}</span>
              {selectedFormats.has(format.key) && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
