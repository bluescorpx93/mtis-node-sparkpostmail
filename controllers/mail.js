var SparkPost = require('sparkpost');
var sparkpostMailer = new SparkPost(`${process.env.SPARKPOST_APIKEY}`);
var mailTemplates = require('../templates/demo');

exports.loadIndex = (req, res, next) => {
  title = "Send Mails in Node & SparkPost";
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
      res.render('confirmation', {title : title, theMail: theMail});
  })
  .catch(err => {
    console.log("SparkPost Error ", err)
    res.render('confirmation', {title : title});
  })
    res.render('confirmation');
};
