import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { socketController } from '../sockets/sockets.js';


export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        /** Configuración del Socket.IO */
        // El servidor que se levantará para los sockets
        this.server = createServer(this.app);
        // Aqui se mantiene toda la información de los clientes conectados al socket
        this.io = new SocketServer(this.server);

        // Conectar a base de datos
        this.connectDatabase();

        // Middleware
        this.middlewares();

        // Rutas de la aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async connectDatabase() {}

    middlewares() {
        /** cors */
        this.app.use(cors());

        /** Lectura y parseo del body */
        // this.app.use(express.json());
        
        /** Directorio público */
        this.app.use(express.static('public'));

        /**  Manejar la carga de archivos */
        // this.app.use(fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/'
        // }));
    }

    routes() {}

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}