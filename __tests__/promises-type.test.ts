import { timeout } from "../src/promises";

const assert_timeout_preserves_generic = () => {
  const number_timeout: Promise<number> = timeout(Promise.resolve(42));
  const string_timeout: Promise<string> = timeout(Promise.resolve("resolved"));

  return [number_timeout, string_timeout] as const;
};

void assert_timeout_preserves_generic;
