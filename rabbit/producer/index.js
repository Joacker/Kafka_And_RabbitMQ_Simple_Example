const amqp = require('amqplib/callback_api'); // Importa libreria

amqp.connect('amqp://0.0.0.0', function(error0, connection) { // Realiza la conexion
    if (error0) { throw error0; }

    connection.createChannel(function(error1, channel) { // Crea un canal
        if (error1) { throw error1; }

        let queue = 'hello'; // Cola a la que se envia el mensaje
        let msg = 'Mensaje de Prueba para ver si funciona!'; // Mensaje a enviar

        channel.assertQueue(queue, { // "Asegura" que exista la cola.
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg)); // Envia el mensaje

        console.log("Device [x] sending: %s", msg);
    });

    setTimeout(function() { connection.close(); process.exit(0); }, 500);
});