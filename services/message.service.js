const {Message} = require('../models');

class MessageService {
    constructor() {
    }

    getMessages(query = {}) {
        return Message.find(query);
    }

    createMessage(message) {
        const newMessage = new Message({
            body: message.body,
            from: message.from,
            to: message.to,
            author: message.author,
            sid: message.sid,
        });
        newMessage.save();
        return newMessage;
    }
}

module.exports = MessageService;
