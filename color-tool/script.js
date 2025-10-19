// Color conversion utilities
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToCmyk(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);
    
    c = k === 1 ? 0 : Math.round(((c - k) / (1 - k)) * 100);
    m = k === 1 ? 0 : Math.round(((m - k) / (1 - k)) * 100);
    y = k === 1 ? 0 : Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);
    
    return [c, m, y, k];
}

function parseColorInput(input) {
    input = input.trim().toLowerCase();

    // HEX
    if (input.match(/^#?[0-9a-f]{6}$/)) {
        const hex = input.replace('#', '');
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(...rgb);
        const cmyk = rgbToCmyk(...rgb);
        return {
            hex: `#${hex.toUpperCase()}`,
            rgb: `rgb(${rgb.join(', ')})`,
            hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
            cmyk: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`
        };
    }

    // RGB
    const rgbMatch = input.match(/rgba?\(?\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)/);
    if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        if (r <= 255 && g <= 255 && b <= 255) {
            const hex = rgbToHex(r, g, b);
            const hsl = rgbToHsl(r, g, b);
            const cmyk = rgbToCmyk(r, g, b);
            return {
                hex,
                rgb: `rgb(${r}, ${g}, ${b})`,
                hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
                cmyk: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`
            };
        }
    }

    return null;
}

// Adobe Swatch Export (.ase)
function exportAsAdobeSwatch(colors) {
    function writeString(str) {
        const arr = [];
        for (let i = 0; i < str.length; i++) {
            arr.push(0);
            arr.push(str.charCodeAt(i));
        }
        arr.push(0, 0);
        return new Uint8Array(arr);
    }

    function writeUInt16(val) {
        return new Uint8Array([(val >> 8) & 0xff, val & 0xff]);
    }

    function writeUInt32(val) {
        return new Uint8Array([
            (val >> 24) & 0xff,
            (val >> 16) & 0xff,
            (val >> 8) & 0xff,
            val & 0xff
        ]);
    }

    function writeFloat(val) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setFloat32(0, val, false);
        return new Uint8Array(buffer);
    }

    function hexToRgbFloat(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b];
    }

    const chunks = [];
    chunks.push(new Uint8Array([0x41, 0x53, 0x45, 0x46])); // "ASEF"
    chunks.push(writeUInt16(1)); // version major
    chunks.push(writeUInt16(0)); // version minor
    chunks.push(writeUInt32(colors.length)); // number of blocks

    colors.forEach((color, index) => {
        const name = `Color ${index + 1}`;
        const nameBytes = writeString(name);
        const [r, g, b] = hexToRgbFloat(color.hex);

        chunks.push(writeUInt16(0x0001)); // block type
        const blockLength = 4 + nameBytes.length + 4 + 4 + 12;
        chunks.push(writeUInt32(blockLength));
        chunks.push(writeUInt16(name.length + 1));
        chunks.push(nameBytes);
        chunks.push(new Uint8Array([0x52, 0x47, 0x42, 0x20])); // "RGB "
        chunks.push(writeFloat(r));
        chunks.push(writeFloat(g));
        chunks.push(writeFloat(b));
        chunks.push(writeUInt16(0)); // color type
    });

    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const aseFile = new Uint8Array(totalLength);
    let offset = 0;
    chunks.forEach(chunk => {
        aseFile.set(chunk, offset);
        offset += chunk.length;
    });

    const blob = new Blob([aseFile], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'color-palette.ase';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

// State
let colors = [];
let selectedFormats = new Set(['hex', 'rgb', 'hsl', 'cmyk']);

// Convert button
document.getElementById('convert-btn').addEventListener('click', () => {
    const input = document.getElementById('color-input').value;
    if (!input.trim()) {
        alert('Please enter at least one color code');
        return;
    }

    const lines = input.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    colors = [];

    lines.forEach((line, index) => {
        const parsed = parseColorInput(line);
        if (parsed) {
            colors.push({ ...parsed, id: Date.now() + index });
        }
    });

    if (colors.length === 0) {
        alert('No valid colors found. Please enter valid color codes.');
        return;
    }

    renderResults();
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('format-selector').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Sample colors button
document.getElementById('sample-btn').addEventListener('click', () => {
    document.getElementById('color-input').value = '#FF6F61\n#FFD166\n#06D6A0';
});

// Format checkboxes
['hex', 'rgb', 'hsl', 'cmyk'].forEach(format => {
    document.getElementById(`format-${format}`).addEventListener('change', (e) => {
        if (e.target.checked) {
            selectedFormats.add(format);
        } else {
            if (selectedFormats.size > 1) {
                selectedFormats.delete(format);
            } else {
                e.target.checked = true;
            }
        }
        renderResults();
    });
});

// Render results
function renderResults() {
    const grid = document.getElementById('colors-grid');
    document.getElementById('color-count').textContent = colors.length;
    
    grid.innerHTML = colors.map((color, index) => `
        <div class="color-card">
            <div class="color-card-content">
                <div class="color-swatch-container">
                    <div class="color-swatch" style="background-color: ${color.hex};" onclick="editColor(${index})"></div>
                    <div class="move-buttons">
                        <button class="move-btn" onclick="moveColor(${index}, -1)" ${index === 0 ? 'disabled' : ''}>↑</button>
                        <button class="move-btn" onclick="moveColor(${index}, 1)" ${index === colors.length - 1 ? 'disabled' : ''}>↓</button>
                    </div>
                </div>
                <div class="color-formats">
                    ${Array.from(selectedFormats).map(format => `
                        <div class="format-item">
                            <div class="format-label">${format.toUpperCase()}</div>
                            <div>${color[format]}</div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary" onclick="copyAllFormats(${index})">📋 Copy All</button>
            </div>
        </div>
    `).join('');
}

// Copy functions
function copyAllFormats(index) {
    const color = colors[index];
    const text = Array.from(selectedFormats).map(f => color[f]).join('\n');
    navigator.clipboard.writeText(text).then(() => {
        alert('All formats copied to clipboard!');
    });
}

document.getElementById('copy-palette-btn').addEventListener('click', () => {
    const text = colors.map(color => 
        Array.from(selectedFormats).map(f => `${f.toUpperCase()}: ${color[f]}`).join('\n')
    ).join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
        alert('Entire palette copied to clipboard!');
    });
});

// Move color
function moveColor(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= colors.length) return;
    [colors[index], colors[newIndex]] = [colors[newIndex], colors[index]];
    renderResults();
}

// Edit color
function editColor(index) {
    const newColor = prompt('Enter new color code:', colors[index].hex);
    if (newColor) {
        const parsed = parseColorInput(newColor);
        if (parsed) {
            colors[index] = { ...parsed, id: colors[index].id };
            renderResults();
        } else {
            alert('Invalid color code');
        }
    }
}

// Export PDF
document.getElementById('export-pdf-btn').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Color Palette', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    const formats = Array.from(selectedFormats);

    colors.forEach(color => {
        if (yPosition > 250) {
            pdf.addPage();
            yPosition = 20;
        }

        const rgb = hexToRgb(color.hex);
        pdf.setFillColor(rgb[0], rgb[1], rgb[2]);
        pdf.rect(20, yPosition, 40, 30, 'F');

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        let textY = yPosition + 8;
        formats.forEach(format => {
            pdf.text(`${format.toUpperCase()}: ${color[format]}`, 70, textY);
            textY += 8;
        });

        yPosition += 45;
    });

    pdf.save('color-palette.pdf');
});

// Export PNG
document.getElementById('export-png-btn').addEventListener('click', async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = document.body.classList.contains('dark');
    const allFormats = [
        { key: 'hex', label: 'HEX' },
        { key: 'rgb', label: 'RGB' },
        { key: 'hsl', label: 'HSL' },
        { key: 'cmyk', label: 'CMYK' }
    ];
    const visibleFormats = allFormats.filter(f => selectedFormats.has(f.key));

    const cardWidth = 800;
    const cardHeight = 100;
    const padding = 20;
    const gap = 20;

    canvas.width = cardWidth + (padding * 2);
    canvas.height = (cardHeight + gap) * colors.length + padding * 2 + 40;

    ctx.fillStyle = isDark ? '#1a1d28' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = isDark ? '#f3f4f6' : '#1a1d28';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Color Palette', padding, padding + 20);

    colors.forEach((color, index) => {
        const y = padding + 60 + index * (cardHeight + gap);
        
        ctx.fillStyle = isDark ? '#252933' : '#f5f5f5';
        ctx.fillRect(padding, y, cardWidth, cardHeight);

        ctx.fillStyle = color.hex;
        ctx.fillRect(padding + 10, y + 10, 100, 80);

        ctx.strokeStyle = isDark ? '#374151' : '#e5e7eb';
        ctx.strokeRect(padding + 10, y + 10, 100, 80);

        const startX = padding + 130;
        const formatSpacing = 180;
        
        visibleFormats.forEach((format, fIndex) => {
            const x = startX + Math.floor(fIndex / 2) * formatSpacing;
            const yOffset = y + 30 + (fIndex % 2) * 40;
            
            ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280';
            ctx.font = 'bold 10px sans-serif';
            ctx.fillText(format.label, x, yOffset);
            
            ctx.fillStyle = isDark ? '#f3f4f6' : '#1a1d28';
            ctx.font = '13px monospace';
            ctx.fillText(color[format.key], x, yOffset + 18);
        });
    });

    canvas.toBlob((blob) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'color-palette.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }
    }, 'image/png');
});

// Export Adobe Swatch
document.getElementById('export-ase-btn').addEventListener('click', () => {
    exportAsAdobeSwatch(colors);
});
