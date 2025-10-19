import { FileDown, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { ColorFormats } from "@/lib/colorUtils";

type ExportButtonsProps = {
  colors: Array<ColorFormats & { id: string }>;
};

export function ExportButtons({ colors }: ExportButtonsProps) {
  const exportAsPDF = async () => {
    if (colors.length === 0) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Color Palette", pageWidth / 2, yPosition, { align: "center" });

    yPosition += 15;

    colors.forEach((color) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFillColor(color.hex);
      pdf.rect(20, yPosition, 40, 30, "F");

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(`HEX: ${color.hex}`, 70, yPosition + 8);
      pdf.text(`RGB: ${color.rgb}`, 70, yPosition + 16);
      pdf.text(`HSL: ${color.hsl}`, 70, yPosition + 24);
      pdf.text(`CMYK: ${color.cmyk}`, 70, yPosition + 32);

      yPosition += 45;
    });

    pdf.save("color-palette.pdf");
  };

  const exportAsPNG = async () => {
    if (colors.length === 0) return;

    const exportElement = document.getElementById("color-palette-export");
    if (!exportElement) return;

    const canvas = await html2canvas(exportElement, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "color-palette.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const isDisabled = colors.length === 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={exportAsPDF}
            disabled={isDisabled}
            className="flex-1"
            data-testid="button-export-pdf"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <Button
            onClick={exportAsPNG}
            disabled={isDisabled}
            variant="secondary"
            className="flex-1"
            data-testid="button-export-png"
          >
            <Image className="h-4 w-4 mr-2" />
            Export as PNG
          </Button>
        </div>
        {isDisabled && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            Add at least one color to enable export
          </p>
        )}
      </CardContent>
    </Card>
  );
}
