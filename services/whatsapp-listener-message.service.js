function setupWhatsappListeners(client) {

    client.on('message', async (msg) => {
        const {
            from,
            body
        } = msg;
        console.log(from)
        console.log(`Mensaje de ${from}: ${body}`);

        // Ejemplo simple de lógica:
        if (body.toLowerCase() === 'hola') {
            await msg.reply('¡Hola! ¿En qué puedo ayudarte?');
        }

        // Otro ejemplo basado en número
        if (from.includes('573219030796')) {
            await msg.reply('Hola usuario VIP 🎉');
        }

        // Podés poner lógica más compleja aquí
    });


}

module.exports = {
    setupWhatsappListeners
};