import { ConversionResults as ConversionResultsComponent } from "../ConversionResults";

export default function ConversionResultsExample() {
  const mockColors = [
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
  ];

  return (
    <div className="bg-background">
      <ConversionResultsComponent 
        colors={mockColors}
        onExportPDF={() => console.log("Export PDF")}
        onExportPNG={() => console.log("Export PNG")}
      />
    </div>
  );
}
