import { useState } from "react";
import { ConversionResults as ConversionResultsComponent } from "../ConversionResults";
import type { ColorFormats } from "@/lib/colorUtils";

export default function ConversionResultsExample() {
  const [mockColors, setMockColors] = useState([
    {
      id: "1",
      hex: "#FF6F61",
      rgb: "rgb(255, 111, 97)",
      hsl: "hsl(5, 100%, 69%)",
      cmyk: "cmyk(0%, 56%, 62%, 0%)",
    },
    {
      id: "2",
      hex: "#6366F1",
      rgb: "rgb(99, 102, 241)",
      hsl: "hsl(239, 84%, 67%)",
      cmyk: "cmyk(59%, 58%, 0%, 5%)",
    },
  ]);

  const [selectedFormats] = useState<Set<string>>(new Set(["hex", "rgb", "hsl"]));

  const handleUpdateColor = (id: string, newColor: ColorFormats) => {
    setMockColors(prev => prev.map(c => c.id === id ? { ...newColor, id } : c));
  };

  const handleMoveColor = (id: string, direction: "up" | "down") => {
    console.log("Move color:", id, direction);
  };

  return (
    <div className="bg-background">
      <ConversionResultsComponent 
        colors={mockColors}
        selectedFormats={selectedFormats}
        onExportPDF={() => console.log("Export PDF")}
        onExportPNG={() => console.log("Export PNG")}
        onExportASE={() => console.log("Export ASE")}
        onUpdateColor={handleUpdateColor}
        onMoveColor={handleMoveColor}
      />
    </div>
  );
}
