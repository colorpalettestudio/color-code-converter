import { useState } from "react";
import { Header } from "@/components/Header";
import { ColorInput } from "@/components/ColorInput";
import { ColorCard } from "@/components/ColorCard";
import { ExportButtons } from "@/components/ExportButtons";
import { EmptyState } from "@/components/EmptyState";
import type { ColorFormats } from "@/lib/colorUtils";

type Color = ColorFormats & { name: string; id: string };

export default function Home() {
  const [colors, setColors] = useState<Color[]>([]);

  const handleAddColor = (color: ColorFormats & { name: string }) => {
    const newColor: Color = {
      ...color,
      id: Date.now().toString(),
    };
    setColors((prev) => [...prev, newColor]);
  };

  const handleDeleteColor = (id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateColorName = (id: string, name: string) => {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-8 max-w-6xl">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Add Your Brand Colors</h2>
            <p className="text-muted-foreground mb-6">
              Enter colors in any format and instantly see all conversions
            </p>
            <ColorInput onColorAdd={handleAddColor} />
          </div>

          {colors.length > 0 && (
            <>
              <div>
                <h2 className="text-2xl font-semibold mb-6">Your Color Palette</h2>
                <div
                  id="color-palette-export"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  data-testid="container-color-grid"
                >
                  {colors.map((color) => (
                    <ColorCard
                      key={color.id}
                      color={color}
                      onDelete={handleDeleteColor}
                      onUpdateName={handleUpdateColorName}
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
