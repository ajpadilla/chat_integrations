const mongosee = require('mongoose');
const {config} = require("../config");

const dbConnection = async() => {
    try {
        const DB_NAME = config.dbName;
        const MONGO_URI = config.dbUrl;
        const URI = `${MONGO_URI}/${DB_NAME}`;
        console.log('URI',URI);
        mongosee.connect(URI);
        console.log("Base de datos online");
    }catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = {
    dbConnection
}