const fileType = require("file-type");

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

interface FileTypeObject {
  ext: string;
  mime: string;
}

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
  const type: FileTypeObject = await fileType.fromBuffer(file);
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
