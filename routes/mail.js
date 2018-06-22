var expressRouter = require('express').Router();
var mailController = require('../controllers/mail.js');

expressRouter.get("/", mailController.loadIndex );
expressRouter.post("/send", mailController.sendMail );

module.exports = expressRouter;
