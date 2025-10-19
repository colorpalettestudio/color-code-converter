import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

export function SEOContent() {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I convert multiple colors at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Simply enter multiple color codes separated by commas or new lines. Our tool will convert all of them instantly and display them in an organized grid format. You can then copy or export your entire palette."
          }
        },
        {
          "@type": "Question",
          "name": "Does this tool work offline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The conversion happens directly in your browser using JavaScript, so once the page is loaded, the core conversion functionality works without an internet connection. However, you'll need to be online to load the page initially and to use export features."
          }
        },
        {
          "@type": "Question",
          "name": "Is this converter free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — always! This color code converter is completely free to use with no sign-up required. You can convert unlimited colors and export as many palettes as you need."
          }
        },
        {
          "@type": "Question",
          "name": "What formats can I export to?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can export your converted color palette as a PDF, PNG image, or Adobe Swatch Exchange (.ase) file. The .ase format works directly with Photoshop, Illustrator, and other Adobe Creative Cloud apps."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate are the color conversions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our converter uses industry-standard color conversion algorithms to ensure accurate translations between color spaces. Note that some slight variations may occur when converting between RGB/HEX (screen colors) and CMYK (print colors) due to the fundamental differences in how these color models work."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    script.id = 'faq-schema';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <article className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <h2>What Is a Color Code Converter?</h2>
          <p>
            A color code converter lets you translate colors between different systems (HEX, RGB, HSL, CMYK, and more). 
            Designers, web developers, and brand builders use converters to make sure their colors look consistent across 
            digital and print media.
          </p>

          <h2>Why Convert Color Codes?</h2>
          <ul>
            <li><strong>Match your brand colors across apps</strong> — Photoshop, Canva, Figma, and other design tools often use different color formats</li>
            <li><strong>Prepare colors for web, print, and product packaging</strong> — Different media require different color spaces</li>
            <li><strong>Quickly check tone variations or generate theme palettes</strong> — Convert and compare colors to build harmonious designs</li>
            <li><strong>Save time and avoid errors</strong> — Instant conversion means no manual calculations or guesswork</li>
          </ul>

          <h2>Supported Color Formats</h2>
          <p>Our converter supports all major color formats used in design and development:</p>
          <ul>
            <li><strong>HEX</strong> — The standard web format (e.g., #FF6F61)</li>
            <li><strong>RGB</strong> — Red, Green, Blue values (e.g., rgb(255, 111, 97))</li>
            <li><strong>HSL</strong> — Hue, Saturation, Lightness (e.g., hsl(5, 100%, 69%))</li>
            <li><strong>CMYK</strong> — Cyan, Magenta, Yellow, Black for print (e.g., cmyk(0%, 56%, 62%, 0%))</li>
          </ul>
        </article>

        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Can I convert multiple colors at once?</AccordionTrigger>
            <AccordionContent>
              Yes! Simply enter multiple color codes separated by commas or new lines. Our tool will convert all of them 
              instantly and display them in an organized grid format. You can then copy or export your entire palette.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Does this tool work offline?</AccordionTrigger>
            <AccordionContent>
              The conversion happens directly in your browser using JavaScript, so once the page is loaded, the core 
              conversion functionality works without an internet connection. However, you'll need to be online to load 
              the page initially and to use export features.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is this converter free?</AccordionTrigger>
            <AccordionContent>
              Yes — always! This color code converter is completely free to use with no sign-up required. You can convert 
              unlimited colors and export as many palettes as you need.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What formats can I export to?</AccordionTrigger>
            <AccordionContent>
              You can export your converted color palette as a PDF, PNG image, or Adobe Swatch Exchange (.ase) file. 
              The .ase format works directly with Photoshop, Illustrator, and other Adobe Creative Cloud apps.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How accurate are the color conversions?</AccordionTrigger>
            <AccordionContent>
              Our converter uses industry-standard color conversion algorithms to ensure accurate translations between 
              color spaces. Note that some slight variations may occur when converting between RGB/HEX (screen colors) 
              and CMYK (print colors) due to the fundamental differences in how these color models work.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
