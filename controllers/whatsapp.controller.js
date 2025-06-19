const sendNotifications = require('../services/whatsapp-send-message.service')


exports.notifyRecipient = (req, res) => {

    let recipients = req.body.data
    recipients = JSON.parse(recipients)

    console.log(recipients.length)
    for (let i = 0; i < recipients.length; i++) {
        const recipientData = {
            name: recipients[i].name,
            phoneNumber: recipients[i].phoneNumber,
            courierDescription: recipients[i].courierDescription
        }
        const message = `¡Hola ${recipientData.name}!, \nDesde Super Logística y Distribuciones Pharmaser \nTe informamos que tu medicamento 💊:\n${recipientData.courierDescription}\nSe encuentra en proceso de envío 🚀.\nLo estaremos entregando en las proximas 48 horas.\nPor favor, estar muy atento a tus llamadas telefónicas 📲\n¡Pronto nos comunicaremos contigo!.`
        sendNotifications(recipientData.phoneNumber, message)
        console.log(message)
    }

    res.send({success:true})
}


exports.notifyPickup = (req, res) => {

    let recipientData = req.body
    console.log(recipientData)
    const message = `¡Hola ${recipientData.name}!, \nDesde Super Logística y Distribuciones Pharmaser \nTe informamos que tu medicamento 💊:\n${recipientData.courierDescription}\nHa sido recogido por el domiciliario.\nLo estaremos entregando en las proximas 24 horas.\nPor favor, estar muy atento a tus llamadas telefónicas 📲\n¡Pronto nos comunicaremos contigo!.`
    let a = sendNotifications(recipientData.phoneNumber, message)
    console.log(a)
    res.send({success:true})
}