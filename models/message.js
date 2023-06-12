const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
    body: {
        type: String,
        required: [true, 'The body is required']
    },
    from: {
        type: String,
        required: [true, 'The from is required'],
    },
    to: {
        type: String,
        required: [true, 'The to is required'],
    },
    author: {
        type: String,
        required: [true, 'The author is required'],
    },
    sid: {
        type: String,
        required: [true, 'The sid is required'],
    }
}, { timestamps: true });

MessageSchema.methods.toJSON = function() {
    const { __v, _id, ...data  } = this.toObject();
    return data;
}

module.exports = model( 'Message', MessageSchema );