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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userRepository_1 = require("../repositories/userRepository");
const registerUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield (0, userRepository_1.findUserByEmail)(email);
    if (existingUser) {
        const error = new Error('Email already in use');
        error.status = 400;
        throw error;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
    const user = yield (0, userRepository_1.createUser)({ username, email, password: hashedPassword });
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.jwtSecret);
    return { user, token };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userRepository_1.findUserByEmail)(email);
    if (!user) {
        const error = new Error('Invalid login credentials');
        error.status = 401;
        throw error;
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid login credentials');
        error.status = 401;
        throw error;
    }
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.jwtSecret);
    return { user, token };
});
exports.loginUser = loginUser;
const checkUser = (req, res) => {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
};
exports.checkUser = checkUser;
