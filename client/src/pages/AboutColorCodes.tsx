import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function AboutColorCodes() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Understanding Color Codes | Color Code Converter Guide</title>
        <meta 
          name="description" 
          content="Learn how color codes work and why they matter for designers. Understand HEX, RGB, HSL, and CMYK formats with practical examples and conversion tips." 
        />
        <meta 
          name="keywords" 
          content="color codes, hex codes explained, rgb color model, hsl color, cmyk printing, color formats, design color theory, color conversion guide" 
        />
        <meta property="og:title" content="Understanding Color Codes | Design Guide" />
        <meta property="og:description" content="Learn how HEX, RGB, HSL, and CMYK color codes work. A practical guide for designers and developers." />
        <meta property="og:url" content="https://thecolorcodeconverter.com/about" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Understanding Color Codes | Design Guide" />
        <meta name="twitter:description" content="Learn how color codes work with practical examples for designers." />
      </Helmet>

      <Navigation />
      
      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Hero Section */}
      <section className="py-12 px-6 md:px-8 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
            Understanding Color Codes: The Secret Language of Design
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            If you've ever worked with digital or print colors, you've probably seen mysterious codes like #F4A261, 
            rgb(244,162,97), or cmyk(3%,44%,71%,0%). These are color codes — the universal language that helps 
            designers, developers, and printers speak in exact shades.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 px-6 md:px-8">
        <div className="container mx-auto max-w-4xl px-4 prose prose-slate dark:prose-invert prose-lg">
          <p className="text-lg mb-6">
            Whether you're designing a logo, building a website, or creating a brand guide, learning how to read and 
            convert these codes will save you from mismatched colors and endless frustration.
          </p>
          
          <p className="text-lg mb-8">
            That's exactly why we built the{" "}
            <Link 
              href="/" 
              className="text-primary hover:underline font-semibold"
              data-testid="link-color-converter"
            >
              Color Code Converter
            </Link>
            {" "}— to help you instantly translate between HEX, RGB, HSL, and CMYK.
          </p>

          {/* Screenshot 1: HEX Input */}
          <div className="my-8 rounded-lg border overflow-hidden shadow-lg">
            <img 
              src="/images/screenshot-1-hex-input.png" 
              alt="Color Code Converter with HEX color #F4A261 entered in the input field"
              className="w-full"
              loading="lazy"
            />
            <p className="text-xs text-center text-muted-foreground py-2 bg-muted/30">
              Enter any color code to start converting
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">What Are Color Codes?</h2>
          <p>
            Every digital color you see on screen is made from a mix of red, green, and blue light — the RGB color model. 
            Those values can be written in different formats depending on where you're using them:
          </p>
          
          <ul className="space-y-2 my-6">
            <li><strong>HEX</strong> – Used mostly in web and digital design (#F4A261).</li>
            <li><strong>RGB</strong> – Preferred in CSS and screens (rgb(244,162,97)).</li>
            <li><strong>HSL</strong> – Adjusts hue, saturation, and lightness (hsl(27,85%,67%)).</li>
            <li><strong>CMYK</strong> – Used in print, defined by ink percentages (cmyk(3%,44%,71%,0%)).</li>
          </ul>
          
          <p>Each format represents the same color, just in a different mathematical language.</p>

          <h2 className="text-3xl font-bold mt-12 mb-4">Why Color Codes Matter</h2>
          <p>
            Consistency is everything in brand design. If your website's beige isn't the same beige on your business 
            cards, your visual identity starts to look off.
          </p>
          
          <p>
            Color codes make sure every designer, printer, and developer is seeing (and using) the exact same color 
            values. They're what keep your hex values in Figma identical to your brand kit in Canva — and to your 
            product packaging in print.
          </p>

          {/* Screenshot 2: Conversion Results */}
          <div className="my-8 rounded-lg border overflow-hidden shadow-lg">
            <img 
              src="/images/screenshot-2-conversion-results.png" 
              alt="Color conversion results showing HEX, RGB, HSL, and CMYK formats with color swatches"
              className="w-full"
              loading="lazy"
            />
            <p className="text-xs text-center text-muted-foreground py-2 bg-muted/30">
              Instantly see all color formats with visual previews
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">How to Convert Between HEX, RGB, HSL, and CMYK</h2>
          <p>You can do this math manually… but why would you?</p>
          
          <p>
            The{" "}
            <Link 
              href="/" 
              className="text-primary hover:underline font-semibold"
              data-testid="link-free-color-converter"
            >
              Free Color Code Converter
            </Link>
            {" "}instantly converts one format to all others. Just paste your color code (like #F4A261) and you'll see:
          </p>
          
          <ul className="space-y-2 my-6">
            <li>RGB</li>
            <li>HSL</li>
            <li>CMYK</li>
            <li>and a live color preview</li>
          </ul>
          
          <p>You can even copy your results or export a PNG/PDF reference for your brand kit.</p>

          <h2 className="text-3xl font-bold mt-12 mb-4">Common Use Cases</h2>
          <p>Here are a few real-world ways designers use color code conversion:</p>
          
          <ul className="space-y-3 my-6">
            <li>
              <strong>Web developers:</strong> Converting HEX colors into RGB or HSL for CSS styling.
            </li>
            <li>
              <strong>Brand designers:</strong> Standardizing colors between digital mockups and print assets.
            </li>
            <li>
              <strong>Marketers:</strong> Matching a brand's Instagram palette to their website's colors.
            </li>
            <li>
              <strong>Printers:</strong> Turning on-screen HEX values into CMYK codes for packaging and marketing collateral.
            </li>
          </ul>
          
          <p>No matter what your role is, color codes are how you keep a brand consistent across platforms.</p>

          {/* Screenshot 3: Export Options */}
          <div className="my-8 rounded-lg border overflow-hidden shadow-lg">
            <img 
              src="/images/screenshot-3-export-options.png" 
              alt="Export dropdown menu showing PDF, PNG, and Adobe Swatch (.ase) export options"
              className="w-full"
              loading="lazy"
            />
            <p className="text-xs text-center text-muted-foreground py-2 bg-muted/30">
              Export your palettes as PDF, PNG, or Adobe Swatch files
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">How It Works Behind the Scenes</h2>
          <p>
            When you paste a HEX value like #F4A261, you're really giving the computer six hexadecimal numbers. 
            The converter translates those numbers into their RGB counterparts — three integers between 0 and 255 
            that define how much red, green, and blue make up that color.
          </p>
          
          <p>HSL, meanwhile, is a more human-friendly way to describe color. Instead of numbers for light, it uses:</p>
          
          <ul className="space-y-2 my-6">
            <li><strong>Hue:</strong> where it sits on the color wheel</li>
            <li><strong>Saturation:</strong> how vivid or muted it is</li>
            <li><strong>Lightness:</strong> how bright or dark it appears</li>
          </ul>
          
          <p>
            CMYK is similar but uses subtractive color — it tells a printer how much ink of each color to mix 
            instead of how much light.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-4">Tips for Designers and Developers</h2>
          <ul className="space-y-3 my-6">
            <li>
              Always double-check CMYK conversions before sending to print — printer profiles can slightly shift 
              color values.
            </li>
            <li>Keep a master list of your brand's HEX codes for consistency.</li>
            <li>Use HSL if you want to adjust lightness or saturation across a palette.</li>
            <li>
              And most importantly — test your colors in context. A color might look different on a bright screen 
              versus a matte print.
            </li>
          </ul>
          
          <p>
            If you're not sure your brand palette works together, try the{" "}
            <a 
              href="https://thecolorpalettestudio.com/products/color-palette-fixer" 
              className="text-primary hover:underline font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Color Palette Fixer
            </a>
            {" "}next — it analyzes your palette and helps you balance color contrast, brightness, and harmony 
            in just 60 seconds.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-4">Related Tools</h2>
          <ul className="space-y-2 my-6">
            <li>
              <a 
                href="https://thecolorpalettestudio.com/products/color-palette-fixer"
                className="text-primary hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Color Palette Fixer
              </a>
              {" "}— Diagnose and fix unbalanced brand palettes.
            </li>
            <li>
              <a 
                href="https://thecolorpalettestudio.com/products/color-palette-tester"
                className="text-primary hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Color Palette Tester
              </a>
              {" "}— Check contrast and accessibility between any color pairs.
            </li>
            <li>
              <a 
                href="https://thecolorpalettestudio.com/"
                className="text-primary hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Color Palette PRO
              </a>
              {" "}— Build complete palettes and export for client presentations.
            </li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-4">Final Thoughts</h2>
          <p>
            Color codes are the foundation of every great brand system. They help you translate creativity into 
            consistency — whether you're coding a site, styling a social post, or sending files to print.
          </p>
          
          <p>
            With tools like the{" "}
            <Link 
              href="/converter" 
              className="text-primary hover:underline font-semibold"
              data-testid="link-color-converter-final"
            >
              Color Code Converter
            </Link>
            , understanding and managing color formats is no longer a guessing game. Drop in your color, see every 
            format instantly, and move confidently between screen and print.
          </p>
          
          <p className="text-xl font-semibold mt-6">Consistency has never looked so colorful.</p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
