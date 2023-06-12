const express = require('express');
const cors = require('cors');
const { dbConnection } = require("../database/config");
const { config } = require('../config')

class Server {
    constructor() {
        this.app = express();
        this.port = null;

        this.paths = {
            message: '/messages',
        };

        //Conectar a base de datos
        this.connectarDB();

        //Middleware
        this.middleware();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectarDB() {
        await dbConnection();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        this.app.use(this.paths.message, require('../routes/message'));
    }

    listen(port) {
        this.port = port ? port : config.port;

        return this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = {Server}