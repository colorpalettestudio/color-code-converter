import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { parseColorInput, type ColorFormats } from "@/lib/colorUtils";
import { useToast } from "@/hooks/use-toast";

type ColorInputProps = {
  onColorAdd: (color: ColorFormats) => void;
};

export function ColorInput({ onColorAdd }: ColorInputProps) {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleAddColor = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Enter a color code",
        description: "Please enter a color in any format (HEX, RGB, HSL, CMYK)",
        variant: "destructive",
      });
      return;
    }

    const parsed = parseColorInput(inputValue);
    if (!parsed) {
      toast({
        title: "Invalid color format",
        description: "Please enter a valid color code. Examples: #FF5733, rgb(255, 87, 51), hsl(9, 100%, 60%)",
        variant: "destructive",
      });
      return;
    }

    onColorAdd(parsed);
    setInputValue("");

    toast({
      title: "Color added!",
      description: "Your color has been added to the palette",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddColor();
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-3">
          <Input
            id="color-code"
            placeholder="Enter HEX, RGB, HSL, or CMYK..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 font-mono"
            data-testid="input-color-code"
          />
          <Button onClick={handleAddColor} data-testid="button-add-color">
            <Plus className="h-4 w-4 mr-2" />
            Add Color
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Supports: #FF5733, rgb(255, 87, 51), hsl(9, 100%, 60%), cmyk(0%, 66%, 80%, 0%)
        </p>
      </CardContent>
    </Card>
  );
}
