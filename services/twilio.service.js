const {config} = require("../config");
const clientTwilio = require('twilio');

class TwilioService {
    constructor() {
        this.client = new clientTwilio(config.twilioAccountSid, config.twilioAuthToken);
    }

    createMessage(data) {
        let message = {
            body: data.body,
            from: data.from,
            to: data.to,
            author: data.author,
        }
       return  this.client.messages
            .create(data)
            .then((twilioMessage) => {
                message.sid = twilioMessage.sid
                return message;
            });
    }

    getAllMessages() {
        return this.client.messages.list({limit: 20});
    }
}

module.exports = TwilioService;
