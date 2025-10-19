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

// State
let colors = [];
let selectedFormats = new Set(['hex', 'rgb', 'hsl', 'cmyk']);

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
}

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
    const element = document.getElementById('colors-grid');
    const canvas = await html2canvas(element, {
        backgroundColor: body.classList.contains('dark') ? '#1a1d28' : '#ffffff',
        scale: 2
    });

    const link = document.createElement('a');
    link.download = 'color-palette.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
