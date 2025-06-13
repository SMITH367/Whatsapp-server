// require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv')
const {setupWhatsappListeners} = require('./services/whatsapp-listener-message.service')
dotenv.config()
const cors = require('cors');
const qrcode = require('qrcode'); // Importa la librería qrcode para generar la imagen

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, authentication, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const {
  Client
} = require('whatsapp-web.js');


const port = process.env.PORT || 8000 


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(cors());



const server = app.listen(port, () => {
  console.log(`Listening on port ${port}. Visit http://localhost:${port}/`);
});

require("./routes/main.whatsapp.route")(app);

const client = new Client({
  puppeteer: {
    handleSIGINT: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  },
  webVersionCache: {
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    type: 'remote'
  }
});

let qrCodeData = null; // Variable para almacenar los datos del QR

client.on('ready', () => {
  console.log('Whatsapp Client is ready!');

  global.whatsappClientService = client
  // setupWhatsappListeners(client);
});

client.on('qr', qr => {
  // Almacena los datos del QR en la variable
  qrCodeData = qr;
  console.log('QR Code received. You can access it at /qrcode');
});

client.on('auth_failure', msg => {
  console.error('Authentication failure:', msg);
});

// Nuevo endpoint para mostrar el código QR
app.get('/qrcode', async (req, res) => {
  if (qrCodeData) {
    try {
      // Genera el código QR como una imagen PNG base64
      const qrImage = await qrcode.toDataURL(qrCodeData);
      // Envía la imagen directamente en el navegador
      res.send(`<img src="${qrImage}" alt="QR Code" />`);
    } catch (err) {
      console.error('Error generating QR code:', err);
      res.status(500).send('Error generating QR code.');
    }
  } else {
    res.status(404).send('QR Code not available yet. Please wait for the client to emit the QR event.');
  }
});


client.initialize()