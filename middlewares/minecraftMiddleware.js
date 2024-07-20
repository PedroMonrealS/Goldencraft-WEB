const mc = require('minecraft-protocol');

const minecraftMiddleware = (req, res, next) => {
  const client = mc.createClient({
    host: 'PedroMonrealGamer.aternos.me', 
    port: 43226,                     
    username: 'GoldenCraft',
    version: '1.20.4'                // especificar una versión soportada

  });

  client.on('login', () => {
    console.log('Conectado al servidor de Minecraft');

    // Enviar un mensaje al chat
    client.write('chat', { message: '¡Hola a todos desde Node.js!' });

    // Responder a la solicitud HTTP
    res.send('Mensaje enviado a Minecraft');
    client.end();
  });

  client.on('error', (err) => {
    console.error('Error:', err);
    res.status(500).send('Error al enviar el mensaje a Minecraft');
    client.end();
  });

  client.on('end', () => {
    console.log('Desconectado del servidor');
  });
};

module.exports = minecraftMiddleware;
