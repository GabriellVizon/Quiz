const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const characters = [
  { id: 'naruto', name: 'Naruto', color: '#f7971e' },
  { id: 'goku', name: 'Goku', color: '#f87171' },
  { id: 'luffy', name: 'Luffy', color: '#ef4444' },
  { id: 'pikachu', name: 'Pikachu', color: '#fbbf24' },
  { id: 'tanjiro', name: 'Tanjiro', color: '#4ade80' },
  { id: 'gojo', name: 'Gojo', color: '#3b82f6' },
  { id: 'mikasa', name: 'Mikasa', color: '#8b5cf6' },
  { id: 'sailor', name: 'Sailor Moon', color: '#ec4899' },
  { id: 'vegeta', name: 'Vegeta', color: '#14b8a6' },
  { id: 'itachi', name: 'Itachi', color: '#cc3333' },
];

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function hexToComponents(hex) {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function createPlaceholder(id, name, colorHex) {
  const W = 120, H = 144;
  const png = new PNG({ width: W, height: H });
  const rgb = hexToComponents(colorHex);
  const cx = W / 2, cy = H / 2;
  const rx = W * 0.38, ry = H * 0.38;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const alpha = Math.max(0, Math.min(1, 1 - (dist - 0.85) / 0.15));

      const pi = (y * W + x) * 4;
      if (alpha <= 0) {
        png.data[pi] = 0;
        png.data[pi + 1] = 0;
        png.data[pi + 2] = 0;
        png.data[pi + 3] = 0;
      } else {
        png.data[pi] = rgb[0];
        png.data[pi + 1] = rgb[1];
        png.data[pi + 2] = rgb[2];
        png.data[pi + 3] = Math.round(alpha * 255);
      }
    }
  }

  return png;
}

const outputDir = path.join(__dirname, '..', 'public', 'characters');
for (const char of characters) {
  const png = createPlaceholder(char.id, char.name, char.color);
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(path.join(outputDir, `${char.id}.png`), buffer);
  console.log(`Created placeholder: ${char.id}.png`);
}

console.log('All placeholders generated!');
