var SparkPost = require('sparkpost');
var appKeys = require('../keys/appKeys');
var sparkpostMailer = new SparkPost(appKeys.SPARKPOST_APIKEY);
var mailTemplates = require('../templates/demo');
var nodemailer = require('nodemailer');
var sparkPostTransport = require('nodemailer-sparkpost-transport')

exports.loadIndex = (req, res, next) => {
  title = "Send Mails in Node with SparkPost";
  res.render('index', {title : title});
}


exports.sendMail = (req, res, next) => {
  successTitle = `Thank you, your mail has been sent to ${req.body.emailTo}`;
  errorTitle = "Your Mail could not be delivered"

  var theMail = {
    mailTo : req.body.emailTo,
    mailSubject : req.body.emailSubject,
    mailBody : req.body.emailBody
  }

  var sparkPostOptions = {
    sandbox : true
  }

  var sparkPostContent = {
    from : 'testing@sparkpostbox.com',
    subject : `${theMail.mailSubject}`,
    html: mailTemplates.demoHTMLTemplate(theMail.mailBody)
  }

  var sparkPostRecipients = [{
    address:  `${theMail.mailTo}`
  }]

  var sparkPostAllOptions = {
    options: sparkPostOptions,
    content : sparkPostContent,
    recipients : sparkPostRecipients
  }

  sparkpostMailer.transmissions.send(sparkPostAllOptions)
  .then( data => {
    console.log("SparkPost Success Data ", data);
    res.render('confirmation', {title : successTitle, thtitleeMail: theMail});
  })
  .catch(err => {
    console.log("SparkPost Error ", err)
    res.render('confirmation', {title : successTitle});
  });

  res.render('confirmation', {title : errorTitle});
};


exports.sendMailSMTP = (req, res, next) => {
  successTitle = `Thank you, your mail has been sent to ${req.body.emailTo}`;
  errorTitle = "Your Mail could not be delivered";

  var theMail = {
    mailTo : req.body.emailTo,
    mailSubject : req.body.emailSubject,
    mailBody : req.body.emailBody
  }

  var transporter = nodemailer.createTransport(sparkPostTransport({
    'sparkPostApiKey': appKeys.SPARKPOST_APIKEY,
    options: {
      sandbox : true
    }
  }));

  // transporter.options = {
  //   sandbox: true
  // }

  // var transportOptions = {
  //   host: `${process.env.SPARKPOST_SMTPHOST}`,
  //   port: process.env.SPARKPOST_PORT,
  //   secure: false,
  //   auth : {
  //     user : `${process.env.SPARKPOST_USERNAME}`,
  //     pass : `${process.env.SPARKPOST_APIKEY}`
  //   }
  // }

  // var transporter = nodemailer.createTransport(transportOptions);

  var mailOptions = {
    from : "testing@sparkpostbox.com",
    to : `${theMail.mailTo}`,
    subject : `${theMail.mailSubject}`,
    html : mailTemplates.demoHTMLTemplate(theMail.mailBody)
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.render('confirmation', {title : errorTitle, theMail : ""});
    }
    console.log('Message sent: %s', info.messageId);
    return res.render('confirmation', {title : successTitle, theMail: theMail});
  });

}
