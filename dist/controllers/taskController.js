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
exports.remove = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const taskService_1 = require("../services/taskService");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
    try {
        const task = yield (0, taskService_1.createATask)(req.body, req.user._id);
        res.status(201).send(task);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.create = create;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
    try {
        const tasks = yield (0, taskService_1.getTasks)(req.user._id);
        res.send(tasks);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
    try {
        const task = yield (0, taskService_1.getTask)(req.params.id, req.user._id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.getOne = getOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
    try {
        const task = yield (0, taskService_1.updateTask)(req.params.id, req.body, req.user._id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
    try {
        const task = yield (0, taskService_1.deleteTask)(req.params.id, req.user._id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.remove = remove;
