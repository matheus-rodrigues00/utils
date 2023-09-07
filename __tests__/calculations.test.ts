const { getDiscountedValue, applyDiscount } = require("@/calculations");

describe("applyDiscount", () => {
  test("should throw an error if discount on price is greater than 100%", async () => {
    const total_price = 100;
    const discount_percentage = 101;
    const callback = () => {
      applyDiscount(total_price, discount_percentage);
    };

    expect(callback).toThrow(Error);
  });

  test("should throw an error if discount on price is smaller than 0%", async () => {
    const total_price = 100;
    const discount_percentage = -1;
    const callback = () => {
      applyDiscount(total_price, discount_percentage);
    };

    expect(callback).toThrow(Error);
  });

  test("should calculate the price as 50 in case 50% of 100", async () => {
    const total_price = 100;
    const discount_percentage = 50;
    const discounted_price = applyDiscount(total_price, discount_percentage);

    expect(discounted_price).toBe(50);
  });

  test("should calculate the price 67 in case 33% of 100", async () => {
    const total_price = 100;
    const discount_percentage = 33;
    const discounted_price = applyDiscount(total_price, discount_percentage);

    expect(discounted_price).toBe(67);
  });

  test("should calculate the price 66.7 in case 33.3% of 100", async () => {
    const total_price = 100;
    const discount_percentage = 33.3;
    const discounted_price = applyDiscount(total_price, discount_percentage);

    expect(discounted_price).toBe(66.7);
  });
});

describe("getDiscountedValue", () => {
  test("should throw an error if discount on price is greater than 100%", async () => {
    const total_price = 100;
    const discount_percentage = 101;
    const callback = () => {
      getDiscountedValue(total_price, discount_percentage);
    };

    expect(callback).toThrow(Error);
  });

  test("should throw an error if discount on price is smaller than 0%", async () => {
    const total_price = 100;
    const discount_percentage = -1;
    const callback = () => {
      getDiscountedValue(total_price, discount_percentage);
    };

    expect(callback).toThrow(Error);
  });

  test("should calculate the price 50% of 100", async () => {
    const total_price = 100;
    const discount_percentage = 50;
    const discounted_value = getDiscountedValue(
      total_price,
      discount_percentage
    );

    expect(discounted_value).toBe(50);
  });

  test("should calculate the price 33.3% of 100", async () => {
    const total_price = 100;
    const discount_percentage = 33.3;
    const discounted_value = getDiscountedValue(
      total_price,
      discount_percentage
    );

    expect(discounted_value).toBe(33.3);
  });

  test("should calculate the price of 33% of 25", async () => {
    const total_price = 25;
    const discount_percentage = 33;
    const discounted_value = getDiscountedValue(
      total_price,
      discount_percentage
    );

    expect(discounted_value).toBe(8.25);
  });
});
