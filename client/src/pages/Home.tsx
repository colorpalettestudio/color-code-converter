import { useState } from "react";
import { Header } from "@/components/Header";
import { ColorInput } from "@/components/ColorInput";
import { ColorCard } from "@/components/ColorCard";
import { ExportButtons } from "@/components/ExportButtons";
import { EmptyState } from "@/components/EmptyState";
import type { ColorFormats } from "@/lib/colorUtils";

type Color = ColorFormats & { id: string };

export default function Home() {
  const [colors, setColors] = useState<Color[]>([]);

  const handleAddColor = (color: ColorFormats) => {
    const newColor: Color = {
      ...color,
      id: Date.now().toString(),
    };
    setColors((prev) => [...prev, newColor]);
  };

  const handleDeleteColor = (id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Add Your Brand Colors</h2>
            <p className="text-muted-foreground mb-6">
              Enter colors in any format and instantly convert and copy
            </p>
            <ColorInput onColorAdd={handleAddColor} />
          </div>

          {colors.length > 0 && (
            <>
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Your Colors ({colors.length})
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Select the formats you need and click "Copy Selected" to copy all at once
                </p>
                <div
                  id="color-palette-export"
                  className="space-y-4"
                  data-testid="container-color-grid"
                >
                  {colors.map((color) => (
                    <ColorCard
                      key={color.id}
                      color={color}
                      onDelete={handleDeleteColor}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6">Export Your Palette</h2>
                <ExportButtons colors={colors} />
              </div>
            </>
          )}

          {colors.length === 0 && <EmptyState />}
        </div>
      </main>
    </div>
  );
}
