const resquest = require('supertest');

const { Server } = require('../models/server');

describe('Test for hello endpoint', () => {
    let server = new Server();
    let app = null;
    beforeAll(() => {
        app = server.listen(3001);
    });

    afterAll(() => {
        app.close();
    });

    describe('test for [GET] /', () => {
        test('should retun "Hello World!"', () => resquest(app)
            .get('/')
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual('Hello World!');
            }));
    });
});
