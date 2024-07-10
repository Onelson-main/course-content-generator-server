"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe('Courses test suite', () => {
    test("Get courses", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/courses');
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toBeDefined;
    });
    test("Get course by id", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/courses/1');
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toBeDefined;
    });
    test("Get course by id - Course does not exist", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/courses/-1');
        expect(response.statusCode).toEqual(404);
        expect(response.body.data).toBeDefined;
    });
    test("Search course by name", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/courses/search?q=UI%20Design%20Fundamentals');
        expect(response.statusCode).toEqual(200);
        expect(response.body.data.title).toBeDefined;
    });
    test("Search course by name - empty input", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/courses/search?q=');
        expect(response.statusCode).toEqual(400);
        expect(response.body.data).toEqual({});
    });
});
