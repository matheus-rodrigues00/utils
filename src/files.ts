interface FileTypeObject {
  ext: string;
  mime: string;
}

/**
 * Returns true if the buffer contains the given byte sequence starting at offset.
 * @param {Buffer} buffer - The buffer to inspect.
 * @param {number[]} bytes - The byte sequence to match.
 * @param {number} [offset=0] - The offset to start matching from.
 * @returns {boolean}
 */
function matchBytes(
  buffer: Buffer,
  bytes: number[],
  offset: number = 0
): boolean {
  if (buffer.length < offset + bytes.length) return false;
  for (let i = 0; i < bytes.length; i++) {
    if (buffer[offset + i] !== bytes[i]) return false;
  }
  return true;
}

/**
 * Detects the file type of a buffer by inspecting its magic bytes. Pure,
 * dependency-free replacement for `file-type`'s `fromBuffer` covering the
 * media types this library documents.
 * @param {Buffer} file - The buffered file to inspect.
 * @returns {FileTypeObject | undefined} - The detected type, or undefined if unknown.
 */
function fromBuffer(file: Buffer): FileTypeObject | undefined {
  if (!file || file.length < 4) return undefined;

  // Images
  if (matchBytes(file, [0x89, 0x50, 0x4e, 0x47]))
    return { ext: "png", mime: "image/png" };
  if (matchBytes(file, [0xff, 0xd8, 0xff]))
    return { ext: "jpg", mime: "image/jpeg" };
  if (matchBytes(file, [0x47, 0x49, 0x46, 0x38]))
    return { ext: "gif", mime: "image/gif" };
  if (matchBytes(file, [0x42, 0x4d]))
    return { ext: "bmp", mime: "image/bmp" };

  // RIFF containers: WEBP (image), WAV (audio), AVI (video)
  if (matchBytes(file, [0x52, 0x49, 0x46, 0x46])) {
    if (matchBytes(file, [0x57, 0x45, 0x42, 0x50], 8))
      return { ext: "webp", mime: "image/webp" };
    if (matchBytes(file, [0x57, 0x41, 0x56, 0x45], 8))
      return { ext: "wav", mime: "audio/wav" };
    if (matchBytes(file, [0x41, 0x56, 0x49, 0x20], 8))
      return { ext: "avi", mime: "video/x-msvideo" };
  }

  // ISO Base Media (MP4 / MOV): "ftyp" box at offset 4, brand at offset 8
  if (matchBytes(file, [0x66, 0x74, 0x79, 0x70], 4)) {
    const brand = file.toString("ascii", 8, 12);
    if (brand.startsWith("qt"))
      return { ext: "mov", mime: "video/quicktime" };
    return { ext: "mp4", mime: "video/mp4" };
  }

  // Matroska / WEBM (EBML header)
  if (matchBytes(file, [0x1a, 0x45, 0xdf, 0xa3]))
    return { ext: "webm", mime: "video/webm" };

  // OGG container (Ogg / Opus / Vorbis)
  if (matchBytes(file, [0x4f, 0x67, 0x67, 0x53]))
    return { ext: "ogg", mime: "video/ogg" };

  // ASF container (WMV / WMA)
  if (matchBytes(file, [0x30, 0x26, 0xb2, 0x75]))
    return { ext: "wmv", mime: "video/x-ms-wmv" };

  // Audio
  if (matchBytes(file, [0x66, 0x4c, 0x61, 0x43]))
    return { ext: "flac", mime: "audio/x-flac" };
  if (matchBytes(file, [0x49, 0x44, 0x33]))
    return { ext: "mp3", mime: "audio/mpeg" };
  if (matchBytes(file, [0xff, 0xfb]) || matchBytes(file, [0xff, 0xf3]))
    return { ext: "mp3", mime: "audio/mpeg" };
  if (matchBytes(file, [0xff, 0xf1]) || matchBytes(file, [0xff, 0xf9]))
    return { ext: "aac", mime: "audio/aac" };

  return undefined;
}

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

/**
 * This method receives an array of extension types and a file and returns true if the file is of one of the media types.
 * @param {string[]} extension_types - The array of media types.
 * @param {Buffer} file - The buffered file to check.
 * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean.
 */
async function checkMediaTypes(
  extension_types: string[],
  file: Buffer
): Promise<boolean> {
  if (!file) {
    throw new Error("checkMediaTypes() expects a file as argument");
  }
  const type = fromBuffer(file);
  if (!type) {
    throw new Error("Media type not supported");
  }
  return extension_types.some(t => type.ext.toLowerCase().includes(t));
}

/**
 * This method receives an array of extension types and a file type object and returns true if the file is of one of the media types.
 * @param {string[]} extension_types - The array of media types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function checkMediaTypesFromFileObject(
  extension_types: string[],
  file_type_object: FileTypeObject
): boolean {
  if (!file_type_object) {
    throw new Error("checkMediaTypesFromObject() expects a file type object");
  }
  return extension_types.some(
    t =>
      file_type_object.ext.toLowerCase().includes(t) ||
      file_type_object.mime.toLowerCase().includes(t)
  );
}

/**
 * This method receives a file type object and returns true if the file is of one of the image types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function isImageFileObject(file_type_object: FileTypeObject): boolean {
  return checkMediaTypesFromFileObject(IMAGE_TYPES, file_type_object);
}

// isVideoFileObject
/**
 * This method receives a file type object and returns true if the file is of one of the video types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function isVideoFileObject(file_type_object: FileTypeObject): boolean {
  return checkMediaTypesFromFileObject(VIDEO_TYPES, file_type_object);
}

// isAudioFileObject
/**
 * This method receives a file type object and returns true if the file is of one of the audio types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function isAudioFileObject(file_type_object: FileTypeObject): boolean {
  return checkMediaTypesFromFileObject(AUDIO_TYPES, file_type_object);
}

export {
  checkMediaTypes,
  checkMediaTypesFromFileObject,
  isImageFileObject,
  isVideoFileObject,
  isAudioFileObject,
  IMAGE_TYPES,
  VIDEO_TYPES,
  AUDIO_TYPES,
};
