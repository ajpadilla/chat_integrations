const MessageService = require('./message.service');
const { generateManyMessages, generateOneMessage} = require("../fakes/message.fake");

const mockGetAll = jest.fn();
const mockCreate = jest.fn();

jest.mock('./message.service', () => jest.fn().mockImplementation(() => ({
    getMessages: mockGetAll,
    createMessage: mockCreate,
})));


describe('Test for MessageService', () => {
    let service;
    beforeEach(() => {
        service = new MessageService();
        jest.clearAllMocks();
    });

    describe('test for getMessages', () => {
        test('Should return a list messages', async () => {
            // Arrange
            mockGetAll.mockResolvedValue(generateManyMessages(20));
            // Act
            const messages = await service.getMessages({});

            // Assert
            expect(messages.length).toEqual(20);
            expect(mockGetAll).toHaveBeenCalled();
            expect(mockGetAll).toHaveBeenCalledTimes(1);
            expect(mockGetAll).toHaveBeenCalledWith({});
        });

        test('Should return a same message', async () => {
            // Arrange
            const fakeMessages = generateManyMessages(4);
            mockGetAll.mockResolvedValue(fakeMessages);

            const messages = await service.getMessages();
            expect(messages[0].sid).toEqual(fakeMessages[0].sid);
        });

        test('Should create a message', async () => {
            // Arrange
            const fakeMessage = generateOneMessage();
            mockCreate.mockResolvedValue(fakeMessage);

            const message = await service.createMessage(fakeMessage);
            expect(message.sid).toEqual(fakeMessage.sid);
        });
    });
});