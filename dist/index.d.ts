type DeepKeys<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: K | `${K & string}.${DeepKeys<O[K]>}` }[keyof O]
    : never
  : never;

// strings.ts
declare function replaceTokens(
  string: string,
  tokens: Record<string, any>,
  regex: RegExp
);
declare function isEmail(str: string): boolean;

// promises.ts
declare interface TimeoutErrorConstants {
  [erorr: string]: string;
}
declare const TimeoutErrors: TimeoutErrorConstants;
declare function sleep(time: number): Promise<void>;
declare function timeout<T>(promise: Promise<T>, time: number): Promise<T>;

// phoneNumbers.ts
declare function validBrazilianPhoneNumber(phone: string): boolean;

// objects.ts
declare function deepClone(obj: object);
declare function pick<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Pick<T, K>;
declare function omit<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): Omit<T, K>;
declare function isObject(value: any): boolean
declare function deepPick<T extends object, K extends DeepKeys<T>>(
  source: T,
  keys: K[]
): Pick<T, K>;


// numbers.ts
declare function random(min: number, max: number): number;

// files.ts
declare const IMAGE_TYPES: string[];
declare const VIDEO_TYPES: string[];
declare const AUDIO_TYPES: string[];
declare interface FileTypeObject {
  ext: string;
  mime: string;
}
declare function checkMediaTypes(
  extension_types: string[],
  file: Buffer
): Promise<boolean>;
declare function checkMediaTypesFromFileObject(
  extension_types: string[],
  file_type_object: FileTypeObject
): boolean;
declare function isImageFileObject(file_type_object: FileTypeObject): boolean;
declare function isVideoFileObject(file_type_object: FileTypeObject): boolean;
declare function isAudioFileObject(file_type_object: FileTypeObject): boolean;

// dateAndTime.ts
declare function getGreeting(): string;
declare function getCurrentDate(): string;
declare function getCurrentTime(): string;
declare function getDaysBetweenDates(date1: Date, date2: Date): number;
declare function formatDateToBrazilianDate(date: Date): string;

// database.ts
declare interface SanitizationOptions {
  data_types?: boolean;
  statements?: boolean;
  clauses?: boolean;
  functions?: boolean;
  operators?: boolean;
  constraints?: boolean;
}
declare function sanitize(
  text: string,
  sanitization_options: SanitizationOptions
): string

// calculations.ts
declare function getDiscountedValue(
  price: number,
  discount_percentage: number
): number;
declare function applyDiscount(price: number, discount_percentage: number): number;

// arrays.ts
declare function uniqueElements(array: any[]): any[];
declare function groupBy<T>(array: T[], key: keyof T): Record<string, T[]>;
declare function randomizeArray(array: any[]): any[];

export { random, replaceTokens, isEmail, TimeoutErrors, sleep, timeout, validBrazilianPhoneNumber, deepClone, pick, omit, isObject, deepPick, IMAGE_TYPES, VIDEO_TYPES, AUDIO_TYPES, checkMediaTypes, checkMediaTypesFromFileObject, isImageFileObject, isVideoFileObject, isAudioFileObject, getGreeting, getCurrentDate, getCurrentTime, getDaysBetweenDates, formatDateToBrazilianDate, sanitize, getDiscountedValue, applyDiscount, uniqueElements, groupBy, randomizeArray };
