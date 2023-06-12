require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUrl: process.env.MONGO_URL,
    dbName: process.env.MONGO_DB_NAME,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioFromNumber: process.env.TWILIO_FROM_NUMBER,
    twilioToNumber: process.env.TWILIO_TO_NUMBER,
};

module.exports = { config };
