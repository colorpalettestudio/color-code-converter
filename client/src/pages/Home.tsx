import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { FormatSelector } from "@/components/FormatSelector";
import { ConversionResults } from "@/components/ConversionResults";
import { HowItWorks } from "@/components/HowItWorks";
import { SEOContent } from "@/components/SEOContent";
import { Footer } from "@/components/Footer";
import type { ColorFormats } from "@/lib/colorUtils";
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

    const cardWidth = 800;
    const cardHeight = 100;
    const padding = 20;
    const gap = 20;

    canvas.width = cardWidth + (padding * 2);
    canvas.height = (cardHeight + gap) * colors.length + padding * 2;

    // Background
    ctx.fillStyle = theme === 'dark' ? '#1a1d28' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = theme === 'dark' ? '#f3f4f6' : '#1a1d28';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText('Color Palette', padding, padding + 20);

    colors.forEach((color, index) => {
      const y = padding + 60 + index * (cardHeight + gap);
      
      // Card background
      ctx.fillStyle = theme === 'dark' ? '#252933' : '#f5f5f5';
      ctx.fillRect(padding, y, cardWidth, cardHeight);

      // Color swatch
      ctx.fillStyle = color.hex;
      ctx.fillRect(padding + 10, y + 10, 100, 80);

      // Border for swatch
      ctx.strokeStyle = theme === 'dark' ? '#374151' : '#e5e7eb';
      ctx.strokeRect(padding + 10, y + 10, 100, 80);

      // Format labels and values
      ctx.fillStyle = theme === 'dark' ? '#f3f4f6' : '#1a1d28';
      ctx.font = '14px monospace';
      
      const startX = padding + 130;
      const formatSpacing = 180;
      
      visibleFormats.forEach((format, fIndex) => {
        const key = format.key as keyof ColorFormats;
        const x = startX + Math.floor(fIndex / 2) * formatSpacing;
        const yOffset = y + 30 + (fIndex % 2) * 40;
        
        // Format label
        ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#6b7280';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(format.label, x, yOffset);
        
        // Format value
        ctx.fillStyle = theme === 'dark' ? '#f3f4f6' : '#1a1d28';
        ctx.font = '13px monospace';
        ctx.fillText(color[key], x, yOffset + 18);
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
