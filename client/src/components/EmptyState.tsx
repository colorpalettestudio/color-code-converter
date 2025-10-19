import { Palette } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <Palette className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2" data-testid="text-empty-title">
        No colors added yet
      </h3>
      <p className="text-muted-foreground max-w-md">
        Add your first brand color above to get started. You can enter colors in HEX, RGB, HSL, or CMYK format.
      </p>
    </div>
  );
}
