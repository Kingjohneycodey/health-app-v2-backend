"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.getTasks = exports.createATask = void 0;
const taskRepository_1 = require("../repositories/taskRepository");
const createATask = (taskData, userId) => {
    return (0, taskRepository_1.createTask)(Object.assign(Object.assign({}, taskData), { userId }));
};
exports.createATask = createATask;
const getTasks = (userId) => {
    return (0, taskRepository_1.findTasksByUserId)(userId);
};
exports.getTasks = getTasks;
const getTask = (taskId, userId) => {
    return (0, taskRepository_1.findTaskById)(taskId).then(task => ((task === null || task === void 0 ? void 0 : task.userId) === userId ? task : null));
};
exports.getTask = getTask;
const updateTask = (taskId, updates, userId) => {
    return (0, taskRepository_1.findTaskById)(taskId).then(task => {
        if ((task === null || task === void 0 ? void 0 : task.userId) !== userId) {
            return null;
        }
        return (0, taskRepository_1.updateTaskById)(taskId, updates);
    });
};
exports.updateTask = updateTask;
const deleteTask = (taskId, userId) => {
    return (0, taskRepository_1.findTaskById)(taskId).then(task => {
        if ((task === null || task === void 0 ? void 0 : task.userId) !== userId) {
            return null;
        }
        return (0, taskRepository_1.deleteTaskById)(taskId);
    });
};
exports.deleteTask = deleteTask;
