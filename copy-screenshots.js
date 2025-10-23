const fs = require('fs');

const files = [
    ['attached_assets/Screenshot 2025-10-23 at 10.13.06 AM_1761232388758.png', 
     'client/public/images/screenshot-1-hex-input.png'],
    ['attached_assets/Screenshot 2025-10-23 at 10.12.55 AM_1761232377547.png', 
     'client/public/images/screenshot-2-conversion-results.png'],
    ['attached_assets/color-palette (15)_1761232403601.png', 
     'client/public/images/screenshot-3-export-options.png']
];

for (const [src, dst] of files) {
    try {
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, dst);
            console.log(`✓ Copied: ${src} -> ${dst}`);
            const stats = fs.statSync(dst);
            console.log(`  Size: ${Math.round(stats.size / 1024)}KB`);
        } else {
            console.log(`✗ Not found: ${src}`);
        }
    } catch (e) {
        console.log(`✗ Error copying ${src}:`, e.message);
    }
}
