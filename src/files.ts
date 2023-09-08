const fileType = require("file-type");

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

export { checkMediaTypes, checkMediaTypesFromFileObject };
