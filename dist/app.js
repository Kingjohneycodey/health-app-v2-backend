"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = require("./routes/authRoutes");
const taskRoutes_1 = require("./routes/taskRoutes");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Define a route for the home URL
app.get('/', (req, res) => {
    res.send('Welcome to health app api!');
});
app.use('/api/auth', authRoutes_1.authRouter);
app.use('/api', taskRoutes_1.taskRouter);
app.use(errorHandler_1.errorHandler);
exports.default = app;
