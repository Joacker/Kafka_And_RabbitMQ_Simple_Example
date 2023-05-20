const amqp = require('amqplib'); // Importar libreria

const rabbitMQ_settings = {
    protocol: 'amqp',
    hostname: 'rabbitmq',
    port: 5672,
    username: 'guest',
    password: 'guest',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}

connect();

async function connect() {
    const msg = 'Mensaje de Prueba para ver si funciona!'; // Mensaje a enviar
    try {
        const connection = await amqp.connect(rabbitMQ_settings);
        console.log('Connected to RabbitMQ from consumer');
        // Ahora vamos a crear un canal
        const channel = await connection.createChannel();
        console.log('Channel created');
        // Ahora vamos a crear una cola
        const queue = 'hello';
        await channel.assertQueue(queue, { durable: false });
        
        console.log('[*] Esperando mensajes en "%s". To exit press CTRL+C', queue);
        channel.consume(queue, function(msg) {
            console.log(" [x] Receivied message: %s", msg.content.toString());
        });
        
    } catch (error) {
        console.log(error);
    }
}

// amqp.connect('amqp://rabbitmq:5672', function(error0, connection) {
//     if (error0) { throw error0; }

//     connection.createChannel(function(error1, channel) { // Crea un canal
//         if (error1) { throw error1; }

//         let queue = 'hello';

//         channel.assertQueue(queue, { durable: false }); // "Asegura" que exista la cola.

//         console.log('[*] Esperando mensajes en "%s". To exit press CTRL+C', queue);

//         channel.consume(queue, function(msg) {
//             console.log(" [x] Sending: %s", msg.content.toString());
//         }, {
//             noAck: true
//         });
//     });
// });