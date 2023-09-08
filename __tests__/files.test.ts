const { checkMediaTypes, checkMediaTypesFromFileObject } = require("@/files");
const fs = require("fs");

interface FileTypeObject {
  ext: string;
  mime: string;
}

// ToDo: move to a constants file
const IMAGE_TYPES: string[] = ["png", "jpg", "jpeg", "webp", "svg", "gif"];
const VIDEO_TYPES: string[] = [
  "mp4",
  "webm",
  "ogg",
  "mov",
  "avi",
  "wmv",
  "quicktime",
  "video/ogg",
];
const AUDIO_TYPES: string[] = [
  "mp3",
  "wav",
  "wma",
  "aac",
  "flac",
  "audio/wav",
  "audio/mpeg",
  "mpeg",
  "opus",
  "audio/ogg",
];

describe("checkMediaTypes", () => {
  test("throws error if no file is passed", async () => {
    await expect(checkMediaTypes(IMAGE_TYPES, null)).rejects.toThrow(
      "checkMediaTypes() expects a file as argument"
    );
  });

  test("returns true if literal image file buffer is passed with png type with IMAGE_TYPES array", async () => {
    const file_path: string = process.cwd() + "/__tests__/assets/cat.png";
    const file_buffer: Buffer = fs.readFileSync(file_path);
    const result = await checkMediaTypes(IMAGE_TYPES, file_buffer);
    expect(result).toBe(true);
  });

  test("throws error if text file is passed, since file-type library doesn't support text based medias", async () => {
    const file_path: string = process.cwd() + "/__tests__/assets/hello.txt";
    const file_buffer: Buffer = fs.readFileSync(file_path);
    await expect(checkMediaTypes(IMAGE_TYPES, file_buffer)).rejects.toThrow(
      "Media type not supported"
    );
  });
});

describe("checkMediaTypesFromFileObject", () => {
  test("throws error if no file type object is passed", () => {
    expect(() => checkMediaTypesFromFileObject(IMAGE_TYPES, null)).toThrow(
      "checkMediaTypesFromObject() expects a file type object"
    );
  });

  test("returns true if literal image file object is passed with png type with IMAGE_TYPES array", () => {
    const file_type_object: FileTypeObject = {
      ext: "png",
      mime: "image/png",
    };
    const result: boolean = checkMediaTypesFromFileObject(
      IMAGE_TYPES,
      file_type_object
    );
    expect(result).toBe(true);
  });

  test("returns true if literal image file object is passed with jpg type with IMAGE_TYPES array", () => {
    const file_type_object: FileTypeObject = {
      ext: "jpg",
      mime: "image/jpg",
    };
    const result: boolean = checkMediaTypesFromFileObject(
      IMAGE_TYPES,
      file_type_object
    );
    expect(result).toBe(true);
  });

  test("returns true if literal image file object is passed with jpg type with VIDEO_TYPES array", () => {
    const file_type_object: FileTypeObject = {
      ext: "jpg",
      mime: "image/jpg",
    };
    const result: boolean = checkMediaTypesFromFileObject(
      VIDEO_TYPES,
      file_type_object
    );
    expect(result).toBe(false);
  });
});
