"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const server = (0, http_1.createServer)(app_1.default);
const port = process.env.PORT || 8003;
try {
    server.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
catch (err) {
    console.log(err);
    if (err.code === 'EADDRINUSE') {
        console.log('Port is already in use');
    }
}
let action = async () => {
    // const startTime = performance.now();
    // console.log(await getCourseFromAI("UI design"));
    // const endTime = performance.now();
    // const duration = endTime - startTime;
    // console.log(`Function took ${duration.toFixed(2)} milliseconds to execute.`);
    // @ts-ignore
    // await createCourse(temp_2)
};
// action()
