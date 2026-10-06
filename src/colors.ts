type RGB = [number, number, number];

function parseChannel(channel: string): number {
  if (channel.endsWith("%")) {
    const percentage = Number.parseFloat(channel.slice(0, -1));

    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
      throw new Error(`Invalid color channel: ${channel}`);
    }

    return (percentage / 100) * 255;
  }

  const value = Number.parseFloat(channel);

  if (!Number.isFinite(value) || value < 0 || value > 255) {
    throw new Error(`Invalid color channel: ${channel}`);
  }

  return value;
}

function parseColor(color: string): RGB {
  const value = color.trim();
  const hex = value.replace(/^#/, "");

  if (/^[\da-f]{3,4}$/i.test(hex)) {
    return [
      Number.parseInt(`${hex[0]}${hex[0]}`, 16),
      Number.parseInt(`${hex[1]}${hex[1]}`, 16),
      Number.parseInt(`${hex[2]}${hex[2]}`, 16),
    ];
  }

  if (/^[\da-f]{6,8}$/i.test(hex)) {
    return [
      Number.parseInt(hex.slice(0, 2), 16),
      Number.parseInt(hex.slice(2, 4), 16),
      Number.parseInt(hex.slice(4, 6), 16),
    ];
  }

  const rgbMatch = value.match(/^rgba?\((.*)\)$/i);

  if (rgbMatch) {
    const channels = rgbMatch[1]
      .replace(/,/g, " ")
      .replace(/\//g, " ")
      .trim()
      .split(/\s+/);

    if (channels.length === 3 || channels.length === 4) {
      return [
        parseChannel(channels[0]),
        parseChannel(channels[1]),
        parseChannel(channels[2]),
      ];
    }
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
