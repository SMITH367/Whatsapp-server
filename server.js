// require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv')
const {setupWhatsappListeners} = require('./services/whatsapp-listener-message.service')
dotenv.config()
const cors = require('cors');

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

const qrcode = require('qrcode-terminal');


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

client.on('ready', () => {
  console.log('Whatsapp Client is ready!');

  global.whatsappClientService = client
  // setupWhatsappListeners(client);
});

client.on('qr', qr => {
  qrcode.generate(qr, {
    small: true
  });
});

client.on('auth_failure', msg => {
  console.error('Authentication failure:', msg);
});


client.initialize()
