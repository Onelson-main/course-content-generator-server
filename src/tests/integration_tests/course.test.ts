import request from 'supertest';
import app from '../../app';


describe('Courses test suite', () => {
    test("Get courses", async () => {
        const response = await request(app).get('/courses');
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toBeDefined
    })

    test("Get course by id", async () => {
        const response = await request(app).get('/courses/1');
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toBeDefined
    })

    test("Get course by id - Course does not exist", async () => {
        const response = await request(app).get('/courses/-1');
        expect(response.statusCode).toEqual(404);
        expect(response.body.data).toBeDefined
    })

    test("Search course by name", async () => {
        const response = await request(app).get('/courses/search?q=UI%20Design%20Fundamentals');
        expect(response.statusCode).toEqual(200);
        expect(response.body.data.title).toBeDefined
    })

    test("Search course by name - empty input", async () => {
        const response = await request(app).get('/courses/search?q=');
        expect(response.statusCode).toEqual(400);
        expect(response.body.data).toEqual({})
    })
})