const amqp = require('amqplib'); // Importa libreria

//maek a connection rabbit mq server from dockerfile

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
        console.log('Connected to RabbitMQ');
        // Ahora vamos a crear un canal
        const channel = await connection.createChannel();
        console.log('Channel created');
        // Ahora vamos a crear una cola
        const queue = 'hello';
        await channel.assertQueue(queue, { durable: false });
        
        await channel.sendToQueue(queue, Buffer.from(msg)); // Envia el mensaje
        console.log("Device [x] sending: %s", msg);
        
    } catch (error) {
        console.log(error);
    }
}

// amqp.connect('amqp://rabbitmq:5672', function(error0, connection) { // Realiza la conexion
//     if (error0) { throw error0; }

//     connection.createChannel(function(error1, channel) { // Crea un canal
//         if (error1) { throw error1; }

//         let queue = 'hello'; // Cola a la que se envia el mensaje
//         let msg = 'Mensaje de Prueba para ver si funciona!'; // Mensaje a enviar

//         channel.assertQueue(queue, { // "Asegura" que exista la cola.
//             durable: false
//         });
//         channel.sendToQueue(queue, Buffer.from(msg)); // Envia el mensaje

//         console.log("Device [x] sending: %s", msg);
//     });

//     setTimeout(function() { connection.close(); process.exit(0); }, 500);
// });