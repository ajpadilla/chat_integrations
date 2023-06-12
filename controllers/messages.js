const { request, response } = require('express');
const { config } = require('../config');
const TwilioService = require('../services/twilio.service');
const MessageService = require("../services/message.service");

const messagesPost = async (req = request, res = response) => {
    try {
        const twilioService = new TwilioService();
        const messageService = new MessageService();

        const { body, author } = req.body;

        const data = {
            body,
            to: config.twilioToNumber, // Text your number
            from: config.twilioFromNumber, // From a valid Twilio number,
            author,
        }

        const message = await twilioService.createMessage(data);
        const newMessage = await messageService.createMessage(message);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
};

const messagesGet = async (req = request, res = response) => {
    try {
        const twilioService = new TwilioService();
        const messageService = new MessageService();

        const messagesListTwilio = twilioService.getAllMessages();

        messagesListTwilio.then(async (messages) => {
            for (const message of messages) {
                const localMessage = await messageService.getMessages({sid: message.sid});
                if(localMessage.length === 0) {
                    await messageService.createMessage({
                        body: message.body,
                        from: config.twilioFromNumber,
                        to: config.twilioToNumber,
                        author: 'Jane Doe',
                        sid: message.sid,
                    });
                }
            }
        });

        const messagesList = await messageService.getMessages();

        res.json(messagesList);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server Error',
        });
    }
};

module.exports = {
    messagesPost,
    messagesGet,
}