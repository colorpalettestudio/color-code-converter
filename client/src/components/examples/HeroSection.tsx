import { HeroSection as HeroSectionComponent } from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <div className="bg-background">
      <HeroSectionComponent 
        onConvert={(colors) => console.log("Converted colors:", colors)} 
      />
    </div>
  );
}
