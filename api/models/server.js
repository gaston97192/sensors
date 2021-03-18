const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.sensorsPath = '/api/sensors';
        this.eventsPath = '/api/events';


        //Conectar a base de datos
        this.connectToDB();

        // Middlewares
        this.middlewares();

        // Rutas 
        this.routes();
    }

    async connectToDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.sensorsPath, require('../routes/sensors'));
        this.app.use( this.eventsPath, require('../routes/events'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;
