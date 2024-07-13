"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTaskById = exports.findTaskById = exports.findTasksByUserId = exports.createTask = void 0;
const Task_1 = require("../models/Task");
const createTask = (taskData) => {
    const task = new Task_1.Task(taskData);
    return task.save();
};
exports.createTask = createTask;
const findTasksByUserId = (userId) => {
    return Task_1.Task.find({ userId });
};
exports.findTasksByUserId = findTasksByUserId;
const findTaskById = (id) => {
    return Task_1.Task.findById(id);
};
exports.findTaskById = findTaskById;
const updateTaskById = (id, updates) => {
    return Task_1.Task.findByIdAndUpdate(id, updates, { new: true });
};
exports.updateTaskById = updateTaskById;
const deleteTaskById = (id) => {
    return Task_1.Task.findByIdAndDelete(id);
};
exports.deleteTaskById = deleteTaskById;
