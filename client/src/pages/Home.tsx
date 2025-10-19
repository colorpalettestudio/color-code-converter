import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FormatSelector } from "@/components/FormatSelector";
import { ConversionResults } from "@/components/ConversionResults";
import { HowItWorks } from "@/components/HowItWorks";
import { CrossPromo } from "@/components/CrossPromo";
import { SEOContent } from "@/components/SEOContent";
import { Footer } from "@/components/Footer";
import type { ColorFormats } from "@/lib/colorUtils";
import { exportAsAdobeSwatch } from "@/lib/adobeSwatchExport";
import jsPDF from "jspdf";
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

  const handleDeleteColor = (id: string) => {
    setColors(prev => prev.filter(c => c.id !== id));
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

    const allFormats = [
      { key: "hex", label: "HEX" },
      { key: "rgb", label: "RGB" },
      { key: "hsl", label: "HSL" },
      { key: "cmyk", label: "CMYK" },
    ];
    const visibleFormats = allFormats.filter(f => selectedFormats.has(f.key));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Improved sizing
    const swatchSize = 120;
    const padding = 40;
    const titleHeight = 60;
    const rowHeight = 140;

    const canvasWidth = 900;
    const canvasHeight = titleHeight + (rowHeight * colors.length) + padding * 2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Background
    ctx.fillStyle = theme === 'dark' ? '#1a1d28' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = theme === 'dark' ? '#f3f4f6' : '#1a1d28';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('Color Palette', padding, padding + 30);

    // Draw each color
    colors.forEach((color, index) => {
      const y = titleHeight + padding + (index * rowHeight);
      
      // Color swatch
      ctx.fillStyle = color.hex;
      ctx.fillRect(padding, y, swatchSize, swatchSize);
      
      // Swatch border
      ctx.strokeStyle = theme === 'dark' ? '#374151' : '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.strokeRect(padding, y, swatchSize, swatchSize);

      // Format labels and values
      const textX = padding + swatchSize + 30;
      let textY = y + 20;
      
      visibleFormats.forEach((format) => {
        const key = format.key as keyof ColorFormats;
        
        // Format label
        ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#6b7280';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(format.label.toUpperCase(), textX, textY);
        
        // Format value
        ctx.fillStyle = theme === 'dark' ? '#f3f4f6' : '#1a1d28';
        ctx.font = '16px monospace';
        ctx.fillText(color[key], textX + 80, textY);
        
        textY += 30;
      });
    });

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'color-palette.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  const exportAsASE = () => {
    if (colors.length === 0) return;
    exportAsAdobeSwatch(colors, 'color-palette.ase');
  };

  return (
    <div className="min-h-screen">
      <HeroSection onConvert={handleConvert} />
      
      {/* Ad Placeholder - Top */}
      <div className="ad-slot-placeholder" data-testid="ad-slot-top">
        <span>Ad Space</span>
      </div>
      
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
        onExportASE={exportAsASE}
        onUpdateColor={handleUpdateColor}
        onMoveColor={handleMoveColor}
        onDeleteColor={handleDeleteColor}
      />
      <HowItWorks />
      <CrossPromo />
      
      {/* Ad Placeholder - Middle */}
      <div className="ad-slot-placeholder" data-testid="ad-slot-middle">
        <span>Ad Space</span>
      </div>
      
      <SEOContent />
      
      {/* Ad Placeholder - Bottom */}
      <div className="ad-slot-placeholder" data-testid="ad-slot-bottom">
        <span>Ad Space</span>
      </div>
      
      <Footer />
    </div>
  );
}
