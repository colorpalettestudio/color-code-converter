import { useEffect } from "react";

export function StaticContent() {
  useEffect(() => {
    // Add valid FAQPage schema - only one instance on the page
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What formats does this converter support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The converter supports HEX, RGB, HSL, and CMYK. Paste any of these formats and the others populate instantly."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate are the conversions, especially CMYK?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RGB/HEX/HSL conversions are exact within normal rounding. CMYK depends on print profiles; this tool uses a common formula for general reference. For critical print work, confirm with your printer's ICC profile."
          }
        },
        {
          "@type": "Question",
          "name": "Can I export or share my results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can copy any value with one click or export a quick reference as PNG or PDF."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The Color Code Converter is free to use without sign-up."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    script.id = 'faq-schema-valid';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-schema-valid');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="py-8 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        {/* Publisher Content Section */}
        <section aria-labelledby="converter-intro" className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <h2 id="converter-intro" className="text-3xl font-bold mb-4">Free Color Code Converter (HEX ⇄ RGB ⇄ HSL ⇄ CMYK)</h2>
          <p className="text-lg mb-4">
            The Color Code Converter is a free, fast tool for designers, developers, and brand owners to
            convert color values between <strong>HEX</strong>, <strong>RGB</strong>, <strong>HSL</strong>, and
            <strong> CMYK</strong>. Paste any color, view live previews, and copy perfectly formatted values for web,
            print, and brand assets. No sign-up required.
          </p>
          <p className="mb-6">
            Unlike generic converters, this tool is built for real-world brand work—clean outputs, instant
            feedback, and export options for sharing palettes with clients or teammates.
          </p>

          <h3 className="text-2xl font-semibold mb-3">How to Use the Converter</h3>
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>Paste a HEX, RGB, HSL, or CMYK value into the input field.</li>
            <li>The tool instantly shows the equivalent values in all other formats with a live color swatch.</li>
            <li>Click "Copy" to copy any value, or use export to save a quick PNG/PDF reference.</li>
          </ol>

          <h3 className="text-2xl font-semibold mb-3">Who It's For</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Designers</strong> keeping palettes consistent across web and print</li>
            <li><strong>Developers</strong> needing clean CSS-ready values</li>
            <li><strong>Brand owners</strong> standardizing colors in guidelines and templates</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3">What You Can Do</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Convert between HEX, RGB, HSL, and CMYK instantly</li>
            <li>See a live color preview and contrast on light/dark backgrounds</li>
            <li>Copy results in one click; export quick references as PNG/PDF</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3">Common Use Cases</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Turn a website HEX (#1A73E8) into CMYK for print packaging</li>
            <li>Grab an HSL value for a CSS theme or Tailwind config</li>
            <li>Standardize a client's brand guide with exact cross-format values</li>
          </ul>

          <p className="mb-8">
            Looking for more color tools? Try the{" "}
            <a href="https://thecolorpalettestudio.com/products/color-palette-fixer" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Color Palette Fixer
            </a>
            {" "}and{" "}
            <a href="https://thecolorpalettestudio.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              The Color Palette Studio
            </a>.
          </p>
        </section>

        <hr className="my-8" />

        {/* FAQ Section */}
        <section aria-labelledby="converter-faq" className="prose prose-slate dark:prose-invert max-w-none">
          <h2 id="converter-faq" className="text-3xl font-bold mb-6">Color Code Converter: FAQ</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">What formats does this converter support?</h3>
              <p>HEX, RGB, HSL, and CMYK. Paste any of these and the others populate instantly.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">How accurate are the conversions, especially CMYK?</h3>
              <p>
                RGB/HEX/HSL conversions are exact within floating-point rounding. CMYK depends on print profiles;
                this tool uses a common formula suitable for general reference. Always proof with your printer's ICC profile for final print work.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Can I export or share my results?</h3>
              <p>Yes—copy any value in one click or export a quick reference as PNG/PDF.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Do I need an account?</h3>
              <p>No. The converter is free and works without sign-up.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
