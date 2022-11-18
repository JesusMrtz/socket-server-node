export function socketController( socket ) {
    console.log('Cliente conectado', socket.id);

    /** Escuchando el evento send-message enviada desde el cliente */
    socket.on('send-message', (payload, callback) => {
        const id = 1234221;
        callback({ id, date: new Date().getTime() });
        
        /**
         * Enviando el mensaje a todos los clientes quee esten escuchando el evento send-message, a excepción que envió el mensaje
        */
        socket.broadcast.emit('send-message', payload);
    });



    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}