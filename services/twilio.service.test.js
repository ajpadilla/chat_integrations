const TwilioService = require('./twilio.service');
const { generateManyMessages, makeMessageListPromise, makeLocalMessage} = require("../fakes/twilio.fake");

const mockGetAll = jest.fn();
const mockCreate = jest.fn();

jest.mock('./twilio.service', () => jest.fn().mockImplementation(() => ({
    getAllMessages: mockGetAll,
    createMessage: mockCreate,
})));


describe('Test for MessageService', () => {
    let service;
    beforeEach(() => {
        service = new TwilioService();
        jest.clearAllMocks();
    });

    describe('test for getMessages', () => {
        test('Should return a list messages', async () => {
            const isResolved = true;
            // Arrange
            mockGetAll.mockResolvedValue(makeMessageListPromise(isResolved, generateManyMessages(20)));
            // Act
            service.getAllMessages().then(messages => {
                // Assert
                expect(messages.length).toEqual(20);
                expect(mockGetAll).toHaveBeenCalled();
                expect(mockGetAll).toHaveBeenCalledTimes(1);
                expect(mockGetAll).toHaveBeenCalledWith();
            });
        });

        test('Should return a error api twilio', async () => {
            const isResolved = false;
            mockGetAll.mockResolvedValue(makeMessageListPromise(isResolved, []));
            // Act
            service.getAllMessages().catch((error) => expect(error).toEqual(`promise shouldn't be resolved`));
        });

        test('Should return the same message', async () => {
            const isResolved = true;
            // Arrange
            const fakeMessagesList = generateManyMessages(4);
            mockGetAll.mockResolvedValue(makeMessageListPromise(isResolved, fakeMessagesList));
            service.getAllMessages().then(messages => {
                // Assert
                expect(messages[0].sid).toEqual(fakeMessagesList[0].sid);
            });
        });

        test('Should create a message', async () => {
            // Arrange
            const fakeMessage = makeLocalMessage();
            mockCreate.mockResolvedValue(fakeMessage);

            const message = await service.createMessage(fakeMessage);
            expect(message.sid).toEqual(fakeMessage.sid);
        });
    });
});