"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.appErrorHandler = void 0;
const appErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send({ error: 'An unexpected error occurred.' });
};
exports.appErrorHandler = appErrorHandler;
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ error: err.message });
    }
    else {
        logger_1.default.error('Unexpected error:', err);
        res.status(500).send({ error: 'An unexpected error occurred.' });
    }
};
exports.errorHandler = errorHandler;
