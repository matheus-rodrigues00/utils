"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
const sql_keywords = require("../helpers/sql_keywords.json");
/**
 * This method recieves an string input and sanitizes removing all SQL injection.
 * @param input
 * @param options
 * @returns {string}
 * @default input ""
 */
function sanitize(input = "", options = {}) {
    const { statements = true, clauses = true, operators = true, data_types = false, functions = false, constraints = false, } = options;
    if (data_types) {
        const regex = new RegExp(`(${sql_keywords.data_types.join("|")})`, "gi");
        input = input.replace(regex, "");
    }
    if (statements) {
        const regex = new RegExp(`(${sql_keywords.statements.join("|")})`, "gi");
        input = input.replace(regex, "");
    }
    if (clauses) {
        const regex = new RegExp(`(${sql_keywords.clauses.join("|")})`, "gi");
        input = input.replace(regex, "");
    }
    if (functions) {
        const regex = new RegExp(`(${sql_keywords.functions.join("|")})`, "gi");
        input = input.replace(regex, "");
    }
    if (operators) {
        const regex = new RegExp(`(${sql_keywords.operators.join("|")})`, "gi");
        input = input.replace(regex, "");
    }
    if (constraints) {
        const regex = new RegExp(`(${sql_keywords.constraints.join("|")})`, "gi");
        input = input.replace(regex, "");
    }
    return input.trim();
}
exports.sanitize = sanitize;
