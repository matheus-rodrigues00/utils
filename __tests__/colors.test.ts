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
});
