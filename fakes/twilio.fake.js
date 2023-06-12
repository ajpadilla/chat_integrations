const { faker } = require('@faker-js/faker');

const generateOneMessage = () => ({
    account_sid : faker.string.uuid(),
    api_version: "2010-04-01",
    body: faker.word.conjunction(),
    date_created: "Fri, 24 May 2019 17:44:46 +0000",
    date_sent: "Fri, 24 May 2019 17:44:50 +0000",
    date_updated: "Fri, 24 May 2019 17:44:50 +0000",
    direction: "outbound-api",
    error_code: null,
    error_message: null,
    from: faker.phone.number(),
    messaging_service_sid: null,
    num_media: "0",
    num_segments: "1",
    price: "-0.00750",
    price_unit: "USD",
    sid: "SMded05904ccb347238880ca9264e8fe1c",
    status: "sent",
    subresource_uris: {
        media: "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        feedback: "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
    },
    tags: {
        "campaign_name": "Spring Sale 2022",
        "message_type": "cart_abandoned"
    },
    to: faker.phone.number(),
    uri: "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
});

const generateManyMessages = (size) => {
    const limit = size ?? 10;
    const fakeMessages = [];
    for (let index = 0; index < limit; index += 1) {
        fakeMessages.push(generateOneMessage());
    }
    return [...fakeMessages];
};

const makeMessageListPromise = (isResolved, messageFakeList) => {
    return new Promise((resolve, reject) => {
        isResolved ? resolve(messageFakeList) : reject(`promise shouldn't be resolved`);
    });
}

const makeLocalMessage = () => ({
    body: faker.word.conjunction(),
    from: faker.phone.number(),
    to: faker.phone.number(),
    author: faker.person.fullName(),
    sid: faker.string.uuid(),
});

module.exports = {
    generateOneMessage,
    generateManyMessages,
    makeMessageListPromise,
    makeLocalMessage,
}