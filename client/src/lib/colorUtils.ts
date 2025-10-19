import convert from "color-convert";

export type ColorFormats = {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
};

export function parseColorInput(input: string): ColorFormats | null {
  const cleaned = input.trim().toLowerCase();

  try {
    // HEX format
    if (cleaned.match(/^#?[0-9a-f]{6}$/)) {
      const hex = cleaned.replace("#", "");
      const rgb = convert.hex.rgb(hex);
      const hsl = convert.hex.hsl(hex);
      const cmyk = convert.hex.cmyk(hex);

      return {
        hex: `#${hex.toUpperCase()}`,
        rgb: `rgb(${rgb.join(", ")})`,
        hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
        cmyk: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`,
      };
    }

    // RGB format - rgb(r, g, b) or r, g, b
    const rgbMatch = cleaned.match(/rgba?\(?\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);

      if (r <= 255 && g <= 255 && b <= 255) {
        const hex = convert.rgb.hex([r, g, b]);
        const hsl = convert.rgb.hsl([r, g, b]);
        const cmyk = convert.rgb.cmyk([r, g, b]);

        return {
          hex: `#${hex.toUpperCase()}`,
          rgb: `rgb(${r}, ${g}, ${b})`,
          hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
          cmyk: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`,
        };
      }
    }

    // HSL format - hsl(h, s%, l%) or h, s, l
    const hslMatch = cleaned.match(/hsla?\(?\s*(\d+)\s*,?\s*(\d+)%?\s*,?\s*(\d+)%?/);
    if (hslMatch) {
      const h = parseInt(hslMatch[1]);
      const s = parseInt(hslMatch[2]);
      const l = parseInt(hslMatch[3]);

      if (h <= 360 && s <= 100 && l <= 100) {
        const hex = convert.hsl.hex([h, s, l]);
        const rgb = convert.hsl.rgb([h, s, l]);
        const cmyk = convert.hsl.cmyk([h, s, l]);

        return {
          hex: `#${hex.toUpperCase()}`,
          rgb: `rgb(${rgb.join(", ")})`,
          hsl: `hsl(${h}, ${s}%, ${l}%)`,
          cmyk: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`,
        };
      }
    }

    // CMYK format - cmyk(c%, m%, y%, k%) or c, m, y, k
    const cmykMatch = cleaned.match(/cmyk\(?\s*(\d+)%?\s*,?\s*(\d+)%?\s*,?\s*(\d+)%?\s*,?\s*(\d+)%?/);
    if (cmykMatch) {
      const c = parseInt(cmykMatch[1]);
      const m = parseInt(cmykMatch[2]);
      const y = parseInt(cmykMatch[3]);
      const k = parseInt(cmykMatch[4]);

      if (c <= 100 && m <= 100 && y <= 100 && k <= 100) {
        const hex = convert.cmyk.hex([c, m, y, k]);
        const rgb = convert.cmyk.rgb([c, m, y, k]);
        const hsl = convert.cmyk.hsl([c, m, y, k]);

        return {
          hex: `#${hex.toUpperCase()}`,
          rgb: `rgb(${rgb.join(", ")})`,
          hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
          cmyk: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`,
        };
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
