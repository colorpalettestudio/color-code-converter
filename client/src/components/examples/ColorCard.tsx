import { ColorCard as ColorCardComponent } from "../ColorCard";

export default function ColorCardExample() {
  const mockColor = {
    id: "1",
    name: "Primary Brand Color",
    hex: "#6366F1",
    rgb: "rgb(99, 102, 241)",
    hsl: "hsl(239, 84%, 67%)",
    cmyk: "cmyk(59%, 58%, 0%, 5%)",
  };

  return (
    <div className="p-8 bg-background max-w-sm">
      <ColorCardComponent
        color={mockColor}
        onDelete={(id) => console.log("Delete color:", id)}
        onUpdateName={(id, name) => console.log("Update name:", id, name)}
      />
    </div>
  );
}
