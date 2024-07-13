"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserById = exports.findUserByEmail = void 0;
const User_1 = require("../models/User");
const findUserByEmail = (email) => {
    return User_1.User.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => {
    return User_1.User.findById(id);
};
exports.findUserById = findUserById;
const createUser = (userData) => {
    const user = new User_1.User(userData);
    return user.save();
};
exports.createUser = createUser;
