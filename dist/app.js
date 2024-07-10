"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AI_module_1 = require("./modules/AI_module");
const DB_module_1 = require("./modules/DB_module");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("tiny"));
app.use(body_parser_1.default.json());
let corsOptions = {
    origin: ["http://localhost:5173", "192.168.43.1", "https://smarteru.netlify.app"],
};
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.send('pong');
});
app.get('/courses', async (req, res) => {
    try {
        let { data } = await (0, DB_module_1.getCoursesFromDB)();
        res.status(200).send({ data: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ data: {} });
    }
});
app.get('/courses/search', async (req, res) => {
    try {
        let title = req.query.q;
        if (!title) {
            res.status(400).send({ data: {} });
            return;
        }
        let data;
        let { status, data: courseData } = await (0, DB_module_1.getCourseFromDBByName)(title);
        if (status) {
            data = courseData;
        }
        else {
            data = await (0, AI_module_1.getCourseFromAI)(title);
        }
        if (data.title) {
            res.status(200).send({ data });
        }
        else {
            // would most likely never get triggered unless AI credits run out
            res.status(404).send({ data: {} });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ data: {} });
    }
});
app.get('/courses/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data;
        data = (await (0, DB_module_1.getCourseFromDBByID)(id)).data;
        if (data === null || data === void 0 ? void 0 : data.title) {
            res.status(200).send({ data });
        }
        else {
            res.status(404).send({ data: {} });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ data: {} });
    }
});
exports.default = app;
