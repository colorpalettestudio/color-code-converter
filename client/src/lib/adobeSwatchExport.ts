// Adobe Swatch Exchange (.ase) format exporter
export function exportAsAdobeSwatch(colors: Array<{ hex: string }>, filename: string = 'palette.ase') {
  // Helper functions
  function writeString(str: string): Uint8Array {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
      arr.push(0); // UTF-16 BE high byte
      arr.push(str.charCodeAt(i)); // UTF-16 BE low byte
    }
    arr.push(0, 0); // null terminator
    return new Uint8Array(arr);
  }

  function writeUInt16(val: number): Uint8Array {
    return new Uint8Array([
      (val >> 8) & 0xff,
      val & 0xff
    ]);
  }

  function writeUInt32(val: number): Uint8Array {
    return new Uint8Array([
      (val >> 24) & 0xff,
      (val >> 16) & 0xff,
      (val >> 8) & 0xff,
      val & 0xff
    ]);
  }

  function writeFloat(val: number): Uint8Array {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, val, false); // big endian
    return new Uint8Array(buffer);
  }

  function hexToRgbFloat(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  }

  const chunks: Uint8Array[] = [];

  // Header: "ASEF"
  chunks.push(new Uint8Array([0x41, 0x53, 0x45, 0x46]));

  // Version: 1.0
  chunks.push(writeUInt16(1)); // major
  chunks.push(writeUInt16(0)); // minor

  // Number of blocks
  chunks.push(writeUInt32(colors.length));

  // Color blocks
  colors.forEach((color, index) => {
    const name = `Color ${index + 1}`;
    const nameBytes = writeString(name);
    const [r, g, b] = hexToRgbFloat(color.hex);

    // Block type: 0x0001 (color entry)
    chunks.push(writeUInt16(0x0001));

    // Block length (4 + nameBytes.length + 4 + 4 + 3*4)
    const blockLength = 4 + nameBytes.length + 4 + 4 + 12;
    chunks.push(writeUInt32(blockLength));

    // Name length (in characters, including null terminator)
    chunks.push(writeUInt16(name.length + 1));

    // Name (UTF-16 BE with null terminator)
    chunks.push(nameBytes);

    // Color mode: "RGB " (4 bytes)
    chunks.push(new Uint8Array([0x52, 0x47, 0x42, 0x20])); // "RGB "

    // RGB values (3 floats)
    chunks.push(writeFloat(r));
    chunks.push(writeFloat(g));
    chunks.push(writeFloat(b));

    // Color type: 0 (global)
    chunks.push(writeUInt16(0));
  });

  // Combine all chunks
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const aseFile = new Uint8Array(totalLength);
  let offset = 0;
  chunks.forEach(chunk => {
    aseFile.set(chunk, offset);
    offset += chunk.length;
  });

  // Download
  const blob = new Blob([aseFile], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
