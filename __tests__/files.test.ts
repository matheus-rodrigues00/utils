const {
  checkMediaTypes,
  checkMediaTypesFromFileObject,
  isImageFileObject,
  isVideoFileObject,
  isAudioFileObject,
  IMAGE_TYPES,
  VIDEO_TYPES,
  AUDIO_TYPES,
} = require("@/");
const fs = require("fs");

interface FileTypeObject {
  ext: string;
  mime: string;
}

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

describe("isImageFileObject", () => {
  test("returns true if image file object is passed with png type", () => {
    const file_type_object: FileTypeObject = {
      ext: "png",
      mime: "image/png",
    };
    const result: boolean = isImageFileObject(file_type_object);
    expect(result).toBe(true);
  });

  test("returns true if image file object is passed with jpg type", () => {
    const file_type_object: FileTypeObject = {
      ext: "jpg",
      mime: "image/jpg",
    };
    const result: boolean = isImageFileObject(file_type_object);
    expect(result).toBe(true);
  });

  test("returns false if image file object is passed with txt type", () => {
    const file_type_object: FileTypeObject = {
      ext: "txt",
      mime: "text/plain",
    };
    const result: boolean = isImageFileObject(file_type_object);
    expect(result).toBe(false);
  });
});

describe("isVideoFileObject", () => {
  test("returns true if video file object is passed with mp4 type", () => {
    const file_type_object: FileTypeObject = {
      ext: "mp4",
      mime: "video/mp4",
    };
    const result: boolean = isVideoFileObject(file_type_object);
    expect(result).toBe(true);
  });

  test("returns true if video file object is passed with webm type", () => {
    const file_type_object: FileTypeObject = {
      ext: "webm",
      mime: "video/webm",
    };
    const result: boolean = isVideoFileObject(file_type_object);
    expect(result).toBe(true);
  });

  test("returns false if video file object is passed with txt type", () => {
    const file_type_object: FileTypeObject = {
      ext: "txt",
      mime: "text/plain",
    };
    const result: boolean = isVideoFileObject(file_type_object);
    expect(result).toBe(false);
  });
});

describe("isAudioFileObject", () => {
  test("returns true if audio file object is passed with mp3 type", () => {
    const file_type_object: FileTypeObject = {
      ext: "mp3",
      mime: "audio/mp3",
    };
    const result: boolean = isAudioFileObject(file_type_object);
    expect(result).toBe(true);
  });

  test("returns true if audio file object is passed with wav type", () => {
    const file_type_object: FileTypeObject = {
      ext: "wav",
      mime: "audio/wav",
    };
    const result: boolean = isAudioFileObject(file_type_object);
    expect(result).toBe(true);
  });

  test("returns false if audio file object is passed with txt type", () => {
    const file_type_object: FileTypeObject = {
      ext: "txt",
      mime: "text/plain",
    };
    const result: boolean = isAudioFileObject(file_type_object);
    expect(result).toBe(false);
  });
});
