// numbers.ts
declare function random(min: number, max: number): number;

// strings.ts
declare function replaceTokens(
  string: string,
  tokens: Record<string, any>,
  regex: RegExp
);
declare function isEmail(str: string): boolean;

export { random, replaceTokens, isEmail };
