import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FormatSelector } from "@/components/FormatSelector";
import { ConversionResults } from "@/components/ConversionResults";
import { HowItWorks } from "@/components/HowItWorks";
import { SEOContent } from "@/components/SEOContent";
import { Footer } from "@/components/Footer";
import type { ColorFormats } from "@/lib/colorUtils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useTheme } from "@/components/ThemeProvider";

type Color = ColorFormats & { id: string };

export default function Home() {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(
    new Set(["hex", "rgb", "hsl", "cmyk"])
  );
  const { theme } = useTheme();

  const handleConvert = (convertedColors: Color[]) => {
    setColors(convertedColors);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleToggleFormat = (format: string) => {
    const newFormats = new Set(selectedFormats);
    if (newFormats.has(format)) {
      if (newFormats.size > 1) {
        newFormats.delete(format);
      }
    } else {
      newFormats.add(format);
    }
    setSelectedFormats(newFormats);
  };

  const handleUpdateColor = (id: string, newColor: ColorFormats) => {
    setColors(prev => prev.map(c => c.id === id ? { ...newColor, id } : c));
  };

  const handleMoveColor = (id: string, direction: "up" | "down") => {
    setColors(prev => {
      const index = prev.findIndex(c => c.id === id);
      if (index === -1) return prev;
      
      const newColors = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      
      if (newIndex < 0 || newIndex >= newColors.length) return prev;
      
      [newColors[index], newColors[newIndex]] = [newColors[newIndex], newColors[index]];
      return newColors;
    });
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

    const allFormats = [
      { key: "hex", label: "HEX" },
      { key: "rgb", label: "RGB" },
      { key: "hsl", label: "HSL" },
      { key: "cmyk", label: "CMYK" },
    ];

    const visibleFormats = allFormats.filter(f => selectedFormats.has(f.key));

    colors.forEach((color) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFillColor(color.hex);
      pdf.rect(20, yPosition, 40, 30, "F");

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      
      let textY = yPosition + 8;
      visibleFormats.forEach((format) => {
        const key = format.key as keyof ColorFormats;
        pdf.text(`${format.label}: ${color[key]}`, 70, textY);
        textY += 8;
      });

      yPosition += 45;
    });

    pdf.save("color-palette.pdf");
  };

  const exportAsPNG = async () => {
    if (colors.length === 0) return;

    const exportElement = document.getElementById("color-palette-export");
    if (!exportElement) return;

    try {
      const canvas = await html2canvas(exportElement, {
        backgroundColor: theme === "dark" ? "#1a1d28" : "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = "color-palette.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to export PNG:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onConvert={handleConvert} />
      {colors.length > 0 && (
        <div className="py-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <FormatSelector 
              selectedFormats={selectedFormats}
              onToggleFormat={handleToggleFormat}
            />
          </div>
        </div>
      )}
      <ConversionResults 
        colors={colors} 
        selectedFormats={selectedFormats}
        onExportPDF={exportAsPDF}
        onExportPNG={exportAsPNG}
        onUpdateColor={handleUpdateColor}
        onMoveColor={handleMoveColor}
      />
      <HowItWorks />
      <SEOContent />
      <Footer />
    </div>
  );
}
