const Auth = require("../middleware/verify-token");
const whatsapp_service = require('../controllers/whatsapp.controller')

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Authorization", "Origin, Content-Type, Accept");
    next();
  });

  // add a product 
  app.post("/api/notifyrecipient",Auth, whatsapp_service.notifyRecipient);
  app.post("/api/notifypickup",Auth, whatsapp_service.notifyPickup);


};