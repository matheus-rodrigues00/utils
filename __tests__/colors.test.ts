const { getBlackOrWhiteContrastColor } = require("@/colors");

describe("getBlackOrWhiteContrastColor", () => {
  test("returns black for a light six-digit hex color", () => {
    expect(getBlackOrWhiteContrastColor("#ffffff")).toBe("#000");
  });

  test("returns white for a dark three-digit hex color", () => {
    expect(getBlackOrWhiteContrastColor("#000")).toBe("#fff");
  });

  test("supports four- and eight-digit hex colors", () => {
    expect(getBlackOrWhiteContrastColor("#fff0")).toBe("#000");
    expect(getBlackOrWhiteContrastColor("00000080")).toBe("#fff");
  });

  test("supports rgb and rgba colors", () => {
    expect(getBlackOrWhiteContrastColor("rgb(255, 255, 255)")).toBe("#000");
    expect(getBlackOrWhiteContrastColor("rgba(0, 0, 0, 0.5)")).toBe("#fff");
  });

  test("supports space-separated RGB channels and percentages", () => {
    expect(getBlackOrWhiteContrastColor("rgb(100% 100% 100% / 50%)")).toBe(
      "#000"
    );
  });

  test("rejects invalid colors", () => {
    expect(() => getBlackOrWhiteContrastColor("not-a-color")).toThrow(
      "Invalid color format"
    );
    expect(() => getBlackOrWhiteContrastColor("rgb(256, 0, 0)")).toThrow(
      "Invalid color channel"
    );
  });

  test("uses perceived brightness to pick the contrast color", () => {
    expect(getBlackOrWhiteContrastColor("#808080")).toBe("#000");
    expect(getBlackOrWhiteContrastColor("#7f7f7f")).toBe("#fff");
    expect(getBlackOrWhiteContrastColor("#ffff00")).toBe("#000");
    expect(getBlackOrWhiteContrastColor("#0000ff")).toBe("#fff");
  });

  test("ignores surrounding whitespace and letter case", () => {
    expect(getBlackOrWhiteContrastColor("  #FFF  ")).toBe("#000");
    expect(getBlackOrWhiteContrastColor("RGB(0, 0, 0)")).toBe("#fff");
  });

  test("rejects hex colors with an unsupported length", () => {
    for (const color of ["#12", "#12345", "#1234567", "#123456789"]) {
      expect(() => getBlackOrWhiteContrastColor(color)).toThrow(
        "Invalid color format"
      );
    }
  });

  test("rejects malformed rgb syntax", () => {
    for (const color of [
      "rgb(10px, 0, 0)",
      "rgb(0,,0,0)",
      "rgb(0 0 0, 1)",
      "rgb(0, 0, 0 / 1)",
      "rgb(0, 0)",
      "rgb(0, 0, 0, 0, 0)",
    ]) {
      expect(() => getBlackOrWhiteContrastColor(color)).toThrow(
        "Invalid color format"
      );
    }
  });

  test("rejects out-of-range alpha values", () => {
    expect(() => getBlackOrWhiteContrastColor("rgba(0, 0, 0, 2)")).toThrow(
      "Invalid color alpha"
    );
    expect(() => getBlackOrWhiteContrastColor("rgb(0 0 0 / 150%)")).toThrow(
      "Invalid color alpha"
    );
  });

  test("rejects non-string input", () => {
    expect(() => getBlackOrWhiteContrastColor(123 as any)).toThrow(TypeError);
  });
});
