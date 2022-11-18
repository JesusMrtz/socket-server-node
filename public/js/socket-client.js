const socket = io();

const labelOnline = document.querySelector('#label-online');
const labelOfline = document.querySelector('#label-ofline');
const txtMessage = document.querySelector('#txt-message');
const btnSend = document.querySelector('#btn-send');


socket.on('connect', () => {
    console.log('Conectado');
    labelOnline.style.display = 'inline';
    labelOfline.style.display = 'none';

});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor!!!');
    
    labelOfline.style.display = 'inline';
    labelOnline.style.display = 'none';
});


btnSend.addEventListener('click', () => {
    const message = txtMessage.value.trim();
    const payload = {
       message,
       name: 'Jesus Martinez Torres',
       date: new Date().getTime() 
    }

    if ( message ) {
        socket.emit('send-message', payload, (id) => {
            console.log('El ID generado desde el servidor es: ', id);
        });
    }
});

socket.on('send-message', (payload)=> {
    console.log(payload);
});