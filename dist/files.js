"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUDIO_TYPES = exports.VIDEO_TYPES = exports.IMAGE_TYPES = exports.isAudioFileObject = exports.isVideoFileObject = exports.isImageFileObject = exports.checkMediaTypesFromFileObject = exports.checkMediaTypes = void 0;
const fileType = require("file-type");
const IMAGE_TYPES = ["png", "jpg", "jpeg", "webp", "svg", "gif"];
exports.IMAGE_TYPES = IMAGE_TYPES;
const VIDEO_TYPES = [
    "mp4",
    "webm",
    "ogg",
    "mov",
    "avi",
    "wmv",
    "quicktime",
    "video/ogg",
];
exports.VIDEO_TYPES = VIDEO_TYPES;
const AUDIO_TYPES = [
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
exports.AUDIO_TYPES = AUDIO_TYPES;
/**
 * This method receives an array of extension types and a file and returns true if the file is of one of the media types.
 * @param {string[]} extension_types - The array of media types.
 * @param {Buffer} file - The buffered file to check.
 * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean.
 */
function checkMediaTypes(extension_types, file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error("checkMediaTypes() expects a file as argument");
        }
        const type = yield fileType.fromBuffer(file);
        if (!type) {
            throw new Error("Media type not supported");
        }
        return extension_types.some(t => type.ext.toLowerCase().includes(t));
    });
}
exports.checkMediaTypes = checkMediaTypes;
/**
 * This method receives an array of extension types and a file type object and returns true if the file is of one of the media types.
 * @param {string[]} extension_types - The array of media types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function checkMediaTypesFromFileObject(extension_types, file_type_object) {
    if (!file_type_object) {
        throw new Error("checkMediaTypesFromObject() expects a file type object");
    }
    return extension_types.some(t => file_type_object.ext.toLowerCase().includes(t) ||
        file_type_object.mime.toLowerCase().includes(t));
}
exports.checkMediaTypesFromFileObject = checkMediaTypesFromFileObject;
/**
 * This method receives a file type object and returns true if the file is of one of the image types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function isImageFileObject(file_type_object) {
    return checkMediaTypesFromFileObject(IMAGE_TYPES, file_type_object);
}
exports.isImageFileObject = isImageFileObject;
// isVideoFileObject
/**
 * This method receives a file type object and returns true if the file is of one of the video types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function isVideoFileObject(file_type_object) {
    return checkMediaTypesFromFileObject(VIDEO_TYPES, file_type_object);
}
exports.isVideoFileObject = isVideoFileObject;
// isAudioFileObject
/**
 * This method receives a file type object and returns true if the file is of one of the audio types.
 * @param {FileTypeObject} file_type_object - The file type object to check.
 * @returns {boolean} - Returns a boolean.
 */
function isAudioFileObject(file_type_object) {
    return checkMediaTypesFromFileObject(AUDIO_TYPES, file_type_object);
}
exports.isAudioFileObject = isAudioFileObject;
