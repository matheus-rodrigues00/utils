"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
const sql_keywords = require("../helpers/sql_keywords.json");
/**
 * This method recieves an string text and sanitizes removing all SQL injection.
 * @param {Date} text - The string to sanitize.
 * @param {SanitizationOptions} sanitization_options - An object containing the options for sanitization.
 * @returns {string} - The sanitized string.
 */
function sanitize(text = "", sanitization_options = {}) {
    const { statements = true, clauses = true, operators = true, data_types = false, functions = false, constraints = false, } = sanitization_options;
    if (data_types) {
        const regex = new RegExp(`(${sql_keywords.data_types.join("|")})`, "gi");
        text = text.replace(regex, "");
    }
    if (statements) {
        const regex = new RegExp(`(${sql_keywords.statements.join("|")})`, "gi");
        text = text.replace(regex, "");
    }
    if (clauses) {
        const regex = new RegExp(`(${sql_keywords.clauses.join("|")})`, "gi");
        text = text.replace(regex, "");
    }
    if (functions) {
        const regex = new RegExp(`(${sql_keywords.functions.join("|")})`, "gi");
        text = text.replace(regex, "");
    }
    if (operators) {
        const regex = new RegExp(`(${sql_keywords.operators.join("|")})`, "gi");
        text = text.replace(regex, "");
    }
    if (constraints) {
        const regex = new RegExp(`(${sql_keywords.constraints.join("|")})`, "gi");
        text = text.replace(regex, "");
    }
    return text.trim();
}
exports.sanitize = sanitize;
