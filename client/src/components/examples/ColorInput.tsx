import { ColorInput as ColorInputComponent } from "../ColorInput";

export default function ColorInputExample() {
  return (
    <div className="p-8 bg-background max-w-2xl">
      <ColorInputComponent
        onColorAdd={(color) => console.log("Color added:", color)}
      />
    </div>
  );
}
