const rgbToHsl = (
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l < 0.5 ? diff / (max + min) : diff / (2 - max - min);
    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } => {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hPrime = h / 60;
  const x = c * (1 - Math.abs((hPrime % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= hPrime && hPrime < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (1 <= hPrime && hPrime < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (2 <= hPrime && hPrime < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (3 <= hPrime && hPrime < 4) {
    r = 0;
    g = x;
    b = c;
  } else if (4 <= hPrime && hPrime < 5) {
    r = x;
    g = 0;
    b = c;
  } else if (5 <= hPrime && hPrime < 6) {
    r = c;
    g = 0;
    b = x;
  }

  const m = l - c / 2;
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
};

export const lightenColor = (hexColor: string, factor: number = 0.7): string => {
  if (!hexColor.startsWith("#")) {
    throw new Error("El color debe comenzar con '#'");
  }

  const color = hexColor.slice(1);
  let r, g, b, a;

  if (color.length === 8) {
    r = parseInt(color.slice(0, 2), 16);
    g = parseInt(color.slice(2, 4), 16);
    b = parseInt(color.slice(4, 6), 16);
    a = parseInt(color.slice(6, 8), 16);
  } else if (color.length === 6) {
    r = parseInt(color.slice(0, 2), 16);
    g = parseInt(color.slice(2, 4), 16);
    b = parseInt(color.slice(4, 6), 16);
    a = 255;
  } else {
    throw new Error("Formato de color inválido. Use #RRGGBB o #RRGGBBAA");
  }

  // Convertir RGB a HSL
  const hsl = rgbToHsl(r, g, b);
  // Aumentar la luminosidad (lightness) por el factor
  hsl.l += factor * (100 - hsl.l);
  hsl.l = Math.min(100, hsl.l); // Limitar a 100%

  // Convertir de vuelta a RGB
  const { r: newR, g: newG, b: newB } = hslToRgb(hsl.h, hsl.s, hsl.l);

  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  let newHexColor = `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;

  // Agregar canal alpha si es necesario
  if (a !== 255) {
    newHexColor += toHex(a);
  }

  return newHexColor;
};