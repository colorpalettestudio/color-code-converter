import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ConversionResults } from "@/components/ConversionResults";
import { HowItWorks } from "@/components/HowItWorks";
import { SEOContent } from "@/components/SEOContent";
import { Footer } from "@/components/Footer";
import type { ColorFormats } from "@/lib/colorUtils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Color = ColorFormats & { id: string };

export default function Home() {
  const [colors, setColors] = useState<Color[]>([]);

  const handleConvert = (convertedColors: Color[]) => {
    setColors(convertedColors);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "color-palette.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onConvert={handleConvert} />
      <ConversionResults 
        colors={colors} 
        onExportPDF={exportAsPDF}
        onExportPNG={exportAsPNG}
      />
      <HowItWorks />
      <SEOContent />
      <Footer />
    </div>
  );
}
