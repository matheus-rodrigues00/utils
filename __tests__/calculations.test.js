const { discountOnPrice, discountedPrice } = require("@/calculations");

describe("discountedPrice", () => {
  test("discountedPrice should throw an error if discount on price is greater than 100%", async () => {
    const price = 100;
    const discount = 101;

    expect(() => {
      discountedPrice(price, discount);
    }).toThrow(Error);
  });

  test("discountedPrice should throw an error if discount on price is smaller than 0%", async () => {
    const price = 100;
    const discount = -1;

    expect(() => {
      discountedPrice(price, discount);
    }).toThrow(Error);
  });

  test("discountedPrice should calculate the price 50% of 100", async () => {
    const price = 100;
    const discount = 50;

    expect(discountedPrice(price, discount)).toBe(50);
  });

  test("discountedPrice should calculate the price 33% of 100", async () => {
    const price = 100;
    const discount = 33;

    expect(discountedPrice(price, discount)).toBe(67);
  });

  test("discountedPrice should calculate the price of 33% of 25", async () => {
    const price = 25;
    const discount = 33;

    expect(discountedPrice(price, discount)).toBe(16.75);
  });

  test("discountedPrice should calculate the price of 25% of 25", async () => {
    const price = 25;
    const discount = 25;

    expect(discountedPrice(price, discount)).toBe(18.75);
  });
});

describe("discountOnPrice", () => {
  test("discountOnPrice should throw an error if discount on price is greater than 100%", async () => {
    const price = 100;
    const discount = 101;

    expect(() => {
      discountOnPrice(price, discount);
    }).toThrow(Error);
  });

  test("discountOnPrice should throw an error if discount on price is smaller than 0%", async () => {
    const price = 100;
    const discount = -1;

    expect(() => {
      discountOnPrice(price, discount);
    }).toThrow(Error);
  });

  test("discountOnPrice should calculate the price 50% of 100", async () => {
    const price = 100;
    const discount = 50;

    expect(discountOnPrice(price, discount)).toBe(50);
  });

  test("discountOnPrice should calculate the price 33% of 100", async () => {
    const price = 100;
    const discount = 33;

    expect(discountOnPrice(price, discount)).toBe(33);
  });

  test("discountOnPrice should calculate the price of 33% of 25", async () => {
    const price = 25;
    const discount = 33;

    expect(discountOnPrice(price, discount)).toBe(8.25);
  });

  test("discountOnPrice should calculate the price of 25% of 25", async () => {
    const price = 25;
    const discount = 25;

    expect(discountOnPrice(price, discount)).toBe(6.25);
  });
});