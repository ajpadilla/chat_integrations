const resquest = require('supertest');
const mockCreateTwilioMessage = jest.fn();
const mockCreateLocalMessage = jest.fn();
const mockTwilioGetAllMessages = jest.fn();
const mockLocalGetAllMessages = jest.fn();
const { Server } = require('../models/server');
const { makeLocalMessage, makeMessageListPromise, generateManyMessages: generateManyTwilioMessages } = require("../fakes/twilio.fake");
const {makeDataForCreateNewMessage, generateManyMessages: generateManyLocalMessages, generateOneMessage: generateOneLocalMessage,
    generateOneMessage
} = require("../fakes/message.fake");

jest.mock('../services/twilio.service', () => jest.fn().mockImplementation(() => ({
    getAllMessages: mockTwilioGetAllMessages,
    createMessage: mockCreateTwilioMessage,
})));

jest.mock('../services/message.service', () => jest.fn().mockImplementation(() => ({
    getMessages: mockLocalGetAllMessages,
    createMessage: mockCreateLocalMessage,
})));

describe('Test for hello endpoint', () => {
    let server = new Server();
    let app = null;
    beforeAll(() => {
        app = server.listen(3001);
    });

    afterAll(() => {
        app.close();
    });

    describe('test for [POST] /messages', () => {
        test('should send and create a new message', () => {
            const fakeMessage = makeLocalMessage();
            mockCreateTwilioMessage.mockResolvedValue(fakeMessage);
            mockCreateLocalMessage.mockResolvedValue(fakeMessage);
            const raw = makeDataForCreateNewMessage();
            return resquest(app)
                .post('/messages')
                .send({body: raw.body, author: raw.author})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(({ body }) => {
                    expect(body.sid).toEqual(fakeMessage.sid);
                });
        });

        test('should return a Internal Server Error to create a new message', () => {
            const fakeMessage = makeLocalMessage();
            mockCreateTwilioMessage.mockImplementationOnce(() => { throw new Error('Internal Server Error') });
            mockCreateLocalMessage.mockResolvedValue(fakeMessage);
            const raw = makeDataForCreateNewMessage();
            return resquest(app)
                .post('/messages')
                .send({body: raw.body, author: raw.author})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(500)
                .expect('{"msg":"Internal Server Error"}')
        });
    });

    describe('test for [GET] /messages', () => {
        test('should return list of messages', () => {
            // Arrange
            const isResolved = true;
            const messagesLocalList = generateManyLocalMessages(20);
            mockTwilioGetAllMessages.mockResolvedValue(makeMessageListPromise(isResolved, generateManyTwilioMessages(20)));
            mockLocalGetAllMessages.mockResolvedValue(messagesLocalList);
            mockCreateLocalMessage.mockResolvedValue(generateOneLocalMessage());
            return resquest(app)
                .get('/messages')
                .expect(200)
                .then(({ body }) => {
                    expect(body.length).toEqual(messagesLocalList.length);
                });
        });

        test('should return a Internal Server Error to return list', () => {
            // Arrange
            const isResolved = true;
            const messagesLocalList = generateManyLocalMessages(20);
            mockTwilioGetAllMessages.mockResolvedValue(makeMessageListPromise(isResolved, generateManyTwilioMessages(20)));
            mockLocalGetAllMessages.mockImplementationOnce(() => { throw new Error('Internal Server Error') });
            mockCreateLocalMessage.mockResolvedValue(generateOneLocalMessage());
            return resquest(app)
                .get('/messages')
                .expect(500)
                .expect('{"msg":"Internal Server Error"}')
        });
    });
});
