import { useState } from "react";
import { FormatSelector as FormatSelectorComponent } from "../FormatSelector";

export default function FormatSelectorExample() {
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(
    new Set(["hex", "rgb", "hsl"])
  );

  const handleToggle = (format: string) => {
    const newFormats = new Set(selectedFormats);
    if (newFormats.has(format)) {
      newFormats.delete(format);
    } else {
      newFormats.add(format);
    }
    setSelectedFormats(newFormats);
  };

  return (
    <div className="p-8 bg-background">
      <FormatSelectorComponent
        selectedFormats={selectedFormats}
        onToggleFormat={handleToggle}
      />
    </div>
  );
}
