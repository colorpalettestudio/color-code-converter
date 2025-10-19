import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ConversionResults } from "@/components/ConversionResults";
import { HowItWorks } from "@/components/HowItWorks";
import { CrossPromo } from "@/components/CrossPromo";
import { SEOContent } from "@/components/SEOContent";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
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

  const handleClearPalette = () => {
    setColors([]);
  };

  const handleAddColor = (color: ColorFormats) => {
    const newColor: Color = {
      ...color,
      id: `${Date.now()}-${Math.random()}`
    };
    setColors(prev => [...prev, newColor]);
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

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling for crisp output
    const scale = 3;
    const cols = 3;
    const cardWidth = 320;
    const cardHeight = 380;
    const gap = 30;
    const padding = 40;
    
    const rows = Math.ceil(colors.length / cols);
    const canvasWidth = (cardWidth * cols) + (gap * (cols - 1)) + (padding * 2);
    const canvasHeight = (cardHeight * rows) + (gap * (rows - 1)) + (padding * 2);

    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    ctx.scale(scale, scale);

    // Background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw each color card
    colors.forEach((color, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = padding + (col * (cardWidth + gap));
      const y = padding + (row * (cardHeight + gap));

      const swatchHeight = 200;
      const textAreaHeight = cardHeight - swatchHeight;
      const borderRadius = 12;

      // Draw card with rounded corners
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + cardWidth - borderRadius, y);
      ctx.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + borderRadius);
      ctx.lineTo(x + cardWidth, y + cardHeight - borderRadius);
      ctx.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth - borderRadius, y + cardHeight);
      ctx.lineTo(x + borderRadius, y + cardHeight);
      ctx.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.clip();

      // Color swatch
      ctx.fillStyle = color.hex;
      ctx.fillRect(x, y, cardWidth, swatchHeight);

      // Text area background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y + swatchHeight, cardWidth, textAreaHeight);

      ctx.restore();

      // Card border
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + cardWidth - borderRadius, y);
      ctx.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + borderRadius);
      ctx.lineTo(x + cardWidth, y + cardHeight - borderRadius);
      ctx.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth - borderRadius, y + cardHeight);
      ctx.lineTo(x + borderRadius, y + cardHeight);
      ctx.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.stroke();

      // Text content
      ctx.fillStyle = '#1a1a1a';
      ctx.font = '15px monospace';
      ctx.textBaseline = 'top';
      
      const textX = x + 20;
      let textY = y + swatchHeight + 20;
      const lineHeight = 28;

      // HEX
      ctx.fillText(color.hex, textX, textY);
      textY += lineHeight;

      // RGB
      ctx.fillText(color.rgb, textX, textY);
      textY += lineHeight;

      // CMYK
      ctx.fillText(color.cmyk, textX, textY);
      textY += lineHeight;

      // HSL
      ctx.fillText(color.hsl, textX, textY);
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
      {/* Header with Theme Toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-end px-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Spacer to account for fixed header */}
      <div className="h-14" />

      <HeroSection onConvert={handleConvert} />
      
      {/* Ad Placeholder - Top */}
      <div className="ad-slot-placeholder" data-testid="ad-slot-top">
        <div className="ad-label">Advertisement</div>
        <div className="ad-choices"></div>
        <div className="ad-content">
          <div className="ad-image">🎨</div>
          <div className="ad-text">
            <div className="ad-headline">Professional Color Tools for Designers - Try Free</div>
            <div className="ad-url">www.adobe.com/color</div>
            <div className="ad-description">Create perfect color palettes with Adobe Color. Access millions of color themes and export directly to Creative Cloud apps.</div>
          </div>
        </div>
      </div>
      
      <ConversionResults 
        colors={colors} 
        selectedFormats={selectedFormats}
        onToggleFormat={handleToggleFormat}
        onExportPDF={exportAsPDF}
        onExportPNG={exportAsPNG}
        onExportASE={exportAsASE}
        onUpdateColor={handleUpdateColor}
        onMoveColor={handleMoveColor}
        onDeleteColor={handleDeleteColor}
        onClearPalette={handleClearPalette}
        onAddColor={handleAddColor}
      />
      <HowItWorks />
      <CrossPromo />
      
      {/* Ad Placeholder - Middle */}
      <div className="ad-slot-placeholder ad-text-only" data-testid="ad-slot-middle">
        <div className="ad-label">Advertisement</div>
        <div className="ad-choices"></div>
        <div className="ad-content">
          <div className="ad-text">
            <div className="ad-headline">Canva Pro - Design Anything. Publish Anywhere.</div>
            <div className="ad-url">www.canva.com</div>
            <div className="ad-description">Join 100M+ users creating stunning designs with Canva Pro. Access 100M+ premium photos, videos, and graphics. Collaborate in real-time. Free 30-day trial.</div>
          </div>
        </div>
      </div>
      
      <SEOContent />
      
      {/* Ad Placeholder - Bottom */}
      <div className="ad-slot-placeholder" data-testid="ad-slot-bottom">
        <div className="ad-label">Advertisement</div>
        <div className="ad-choices"></div>
        <div className="ad-content">
          <div className="ad-image">🎨</div>
          <div className="ad-text">
            <div className="ad-headline">Figma - The Collaborative Design Platform</div>
            <div className="ad-url">www.figma.com</div>
            <div className="ad-description">Design, prototype, and collaborate all in one place. Free for individuals. Used by teams at Microsoft, Uber, Airbnb and more.</div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
