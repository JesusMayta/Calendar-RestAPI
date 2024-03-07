const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('../database/config');
require('colors');

class Server {

    constructor() {

        this.paths = {
            authRoute: '/api/auth',
            eventsRoute: '/api/events',
        }

        this.app = express();
        this.port = process.env.PORT || 8081;

        //* Connection to mongo
        this.connectionToMongo();

        //* App middlewares
        this.middlewares();

        //* App routes
        this.routes();
    };

    async connectionToMongo() {
        await dbConnection();
    };

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    };

    routes() {
        this.app.use(this.paths.authRoute, require('../routes/auth.route'));
        this.app.use(this.paths.eventsRoute, require('../routes/events.route'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`\nServer listening on port ${this.port}`.yellow.italic.bold);
        });
    };
};

module.exports = Server;