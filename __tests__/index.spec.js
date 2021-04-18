const request = require('supertest');
const app = require('../index.js');
require('dotenv').config();

test('/ping', async () => {
    await request(app)
        .get('/ping')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            expect(body).toEqual({pong: true});
        });
});

test('/note', async () => {
    await request(app)
        .get('/note')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            expect(body).toEqual({
                msg: 'success',
                data: [],
            });
        });
});