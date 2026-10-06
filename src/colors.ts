type RGB = [number, number, number];

const NUMBER = "[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?";
const CHANNEL = `${NUMBER}%?`;
const COMMA_RGB = new RegExp(
  `^rgba?\\(\\s*(${CHANNEL})\\s*,\\s*(${CHANNEL})\\s*,\\s*(${CHANNEL})\\s*(?:,\\s*(${CHANNEL})\\s*)?\\)$`,
  "i"
);
const SPACE_RGB = new RegExp(
  `^rgba?\\(\\s*(${CHANNEL})\\s+(${CHANNEL})\\s+(${CHANNEL})\\s*(?:\\/\\s*(${CHANNEL})\\s*)?\\)$`,
  "i"
);

function parseChannel(channel: string): number {
  if (channel.endsWith("%")) {
    const percentage = Number(channel.slice(0, -1));

    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      throw new Error(`Invalid color channel: ${channel}`);
    }

    return (percentage / 100) * 255;
  }

  const value = Number(channel);

  if (!Number.isFinite(value) || value < 0 || value > 255) {
    throw new Error(`Invalid color channel: ${channel}`);
  }

  return value;
}

function validateAlpha(alpha: string): void {
  const value = alpha.endsWith("%")
    ? Number(alpha.slice(0, -1)) / 100
    : Number(alpha);

  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(`Invalid color alpha: ${alpha}`);
  }
}

function parseColor(color: string): RGB {
  if (typeof color !== "string") {
    throw new TypeError("Color must be a string");
  }

  const value = color.trim();
  const hex = value.replace(/^#/, "");

  if (/^[\da-f]{3,4}$/i.test(hex)) {
    return [
      Number.parseInt(`${hex[0]}${hex[0]}`, 16),
      Number.parseInt(`${hex[1]}${hex[1]}`, 16),
      Number.parseInt(`${hex[2]}${hex[2]}`, 16),
    ];
  }

  if (/^(?:[\da-f]{6}|[\da-f]{8})$/i.test(hex)) {
    return [
      Number.parseInt(hex.slice(0, 2), 16),
      Number.parseInt(hex.slice(2, 4), 16),
      Number.parseInt(hex.slice(4, 6), 16),
    ];
  }

  const rgbMatch = value.match(COMMA_RGB) || value.match(SPACE_RGB);

  if (rgbMatch) {
    const [, red, green, blue, alpha] = rgbMatch;

    if (alpha !== undefined) {
      validateAlpha(alpha);
    }

    return [parseChannel(red), parseChannel(green), parseChannel(blue)];
  }

  throw new Error(`Invalid color format: ${color}`);
}

/**
 * Returns the most readable black or white text color for a hex, RGB, or RGBA
 * color. Alpha is accepted but ignored because no background color is known.
 * @param {string} color - A 3/4/6/8-digit hex or rgb()/rgba() color.
 * @returns {string} "#000" for light colors, or "#fff" for dark colors.
 */
function getBlackOrWhiteContrastColor(color: string): string {
  const [red, green, blue] = parseColor(color);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.5 ? "#000" : "#fff";
}

export { getBlackOrWhiteContrastColor };
