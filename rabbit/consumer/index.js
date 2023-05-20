const amqp = require('amqplib/callback_api'); // Importar libreria

amqp.connect('amqp://0.0.0.0', function(error0, connection) {
    if (error0) { throw error0; }

    connection.createChannel(function(error1, channel) { // Crea un canal
        if (error1) { throw error1; }

        let queue = 'hello';

        channel.assertQueue(queue, { durable: false }); // "Asegura" que exista la cola.

        console.log('[*] Esperando mensajes en "%s". To exit press CTRL+C', queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Sending: %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});