import { timeout } from "@/promises";

// Guards #75: timeout<T> must preserve T (it used to widen to Promise<unknown>
// and drop the generic). The explicit `number`/`string` annotations on the
// awaited results double as a compile-time check — they stop compiling under
// `bun run typecheck` if the generic is ever dropped again.
describe("timeout generic preservation", () => {
  test("preserves the resolved type and value of the input promise", async () => {
    const num: number = await timeout(Promise.resolve(42));
    const str: string = await timeout(Promise.resolve("resolved"));

    expect(num).toBe(42);
    expect(str).toBe("resolved");
  });
});
