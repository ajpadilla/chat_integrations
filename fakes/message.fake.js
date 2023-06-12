const { faker } = require('@faker-js/faker');

const generateOneMessage = () => ({
    _id: faker.string.uuid(),
    body: faker.word.conjunction(),
    from: faker.phone.number(),
    to: faker.phone.number(),
    author: faker.person.fullName(),
    sid: faker.string.uuid(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime()
});

const generateManyMessages = (size) => {
    const limit = size ?? 10;
    const fakeMessages = [];
    for (let index = 0; index < limit; index += 1) {
        fakeMessages.push(generateOneMessage());
    }
    return [...fakeMessages];
};

const makeDataForCreateNewMessage = () => ({
    body: faker.word.conjunction(),
    author: faker.person.fullName(),
});

module.exports = {
    generateOneMessage,
    generateManyMessages,
    makeDataForCreateNewMessage,
};
