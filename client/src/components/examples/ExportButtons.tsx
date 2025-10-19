import { ExportButtons as ExportButtonsComponent } from "../ExportButtons";

export default function ExportButtonsExample() {
  const mockColors = [
    {
      id: "1",
      name: "Primary",
      hex: "#6366F1",
      rgb: "rgb(99, 102, 241)",
      hsl: "hsl(239, 84%, 67%)",
      cmyk: "cmyk(59%, 58%, 0%, 5%)",
    },
  ];

  return (
    <div className="p-8 bg-background max-w-2xl">
      <ExportButtonsComponent colors={mockColors} />
    </div>
  );
}
