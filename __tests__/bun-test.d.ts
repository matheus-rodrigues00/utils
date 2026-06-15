// Promote bun's `bun:test` exports to globals for typechecking.
// Bun injects these at runtime, but bun-types only references the module
// form (`bun:test`), not its global declarations, so tsc needs this.
import type * as BunTest from "bun:test";

declare global {
  const describe: typeof BunTest.describe;
  const it: typeof BunTest.it;
  const test: typeof BunTest.test;
  const expect: typeof BunTest.expect;
  const beforeAll: typeof BunTest.beforeAll;
  const beforeEach: typeof BunTest.beforeEach;
  const afterAll: typeof BunTest.afterAll;
  const afterEach: typeof BunTest.afterEach;
}
