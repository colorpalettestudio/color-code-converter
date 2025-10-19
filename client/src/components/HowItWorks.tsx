import { FileInput, Zap, Download } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: FileInput,
      title: "Paste or upload your color codes",
      description: "Enter any color format: HEX, RGB, HSL, or CMYK",
    },
    {
      number: "2",
      icon: Zap,
      title: 'Click "Convert" — get instant formats',
      description: "See all conversions displayed in a clean grid",
    },
    {
      number: "3",
      icon: Download,
      title: "Export your full palette for design use",
      description: "Download as PDF or PNG for your projects",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works (in 3 Simple Steps)
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{step.number}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
