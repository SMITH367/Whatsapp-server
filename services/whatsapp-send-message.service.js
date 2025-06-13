const sendNotifications = async (phoneNumber = "", message) => {
    const client =  global.whatsappClientService
    const sanitized_number = phoneNumber.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
    const final_number = `57${sanitized_number.substring(sanitized_number.length - 10)}@c.us`; // add 91 before the number here 91 is country code of India

    if (client) {
        try {
            client.sendMessage(final_number, message).then(() => true)
            return true
        } catch (error) {
            console.error("WHATSAPP CLIENT WAS FILED TO SEND MESSAGE", error)
            console.error(error)
            return false
        }
    } else {
        console.error("WHATSAPP CLIENT IS NOT WORKING... Somenthing is wrong...")
        return false
    }
}

module.exports = sendNotifications