import { RGBColor } from './date-picker.model';

export class Color {
  parseRGB(color: string): RGBColor {
    const rgb: any = color.match(/(rgba?)|(\d+(\.\d+)?%?)|(\.\d+)/g);

    if (rgb.length == -1) throw Error('Invalid RGB Color Code');

    if (rgb.length == 5) {
      return { r: rgb[1], g: rgb[2], b: rgb[3], a: rgb[4] };
    } else {
      return { r: rgb[1], g: rgb[2], b: rgb[3] };
    }
  }

  RGBToHex(r: number, g: number, b: number, a: number): string {
    // Validation
    if (typeof r != 'number' || typeof g != 'number' || typeof b != 'number') {
      throw Error('Invalid RGB Code');
    }
    if (r < 0 || r > 255 || b < 0 || b > 255 || g < 0 || g > 255) {
      throw Error('Invalid RGB Code');
    }

    // convert to base 16 && must be 2 bits
    const strR: string = r.toString(16).padStart(2, '0');
    const strG: string = g.toString(16).padStart(2, '0');
    const strB: string = b.toString(16).padStart(2, '0');

    // if there is alpha
    let strA: string = '';
    if (a) {
      if (a < 0 || a > 1) throw Error('Invalid Alpha Value');
      strA = (Math.round(a * 255) | (1 << 8)).toString(16).slice(1);
    }

    // compile hexcode
    const hex: string = '#' + strR + strG + strB + strA;

    return hex;
  }

  hexToRGB(hex: string = ''): RGBColor {
    // remove #
    hex = hex.replace('#', '');
    let length = hex.length;
    // Validate
    if (length != 3 && length != 4 && length != 6 && length != 8) {
      throw Error('Invalid Hex Code');
    }

    hex = length == 4 ? '00' + hex : length == 3 ? hex + hex : hex;

    let result: RGBColor;

    const r: number = parseInt(hex.slice(0, 2), 16);
    const g: number = parseInt(hex.slice(2, 4), 16);
    const b: number = parseInt(hex.slice(4, 6), 16);
    result = { r, g, b };

    let a: number;
    if (hex.length == 8) {
      a = Math.round((parseInt(hex.slice(6, 8), 16) / 255) * 1000) / 1000;

      result = { r, g, b, a };
    }

    return result;
  }

  lightness(color: string, perc: number): string {
    const hex = /^#[0-9a-fA-F]{3,6}$/;
    const rgba = new RegExp(
      /rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/
    );
    if (typeof perc != 'number' || perc < 0 || perc > 100) {
      throw Error('Lightness: Invalid percentage must be 0 < x <= 100');
    }

    if (hex.test(color)) {
      return this.hexLightness(color, perc);
    } else if (rgba.test(color)) {
      return this.rgbLightness(color, perc);
    } else {
      throw Error('color must be in hex code or rgba? format');
    }
  }

  hexLightness(hex: string, perc: number): string {
    hex = hex.replace('#', '');
    let length = hex.length;
    // Validate
    if (length != 3 && length != 4 && length != 6 && length != 8) {
      throw Error('Invalid Hex Code');
    }

    hex = length == 4 ? '00' + hex : length == 3 ? hex + hex : hex;
    perc /= 100;

    let lastHex: string;
    if (hex.length == 6) {
      lastHex = Math.round(perc * 255).toString(16);
    } else {
      const alpha: number =
        (Math.round((parseInt(hex.slice(6, 8), 16) / 255) * 1000) / 1000) *
        perc;
      lastHex = Math.round(alpha * 255).toString(16);
    }

    return '#' + hex.slice(0, 6) + lastHex;
  }

  rgbLightness(color: string, perc: number): string {
    let parsed = this.parseRGB(color);
    console.log(parsed);
    const length = Object.keys(parsed).length;

    perc /= 100;
    console.log(perc);
    if (length == 3) {
      parsed = { ...parsed, a: perc };
      return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${parsed.a})`;
    } else {
      parsed = { ...parsed, a: parsed.a! * perc };
      return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${parsed.a})`;
    }
  }
}
