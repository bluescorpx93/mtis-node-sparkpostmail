var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mailRouter = require('../routes/mail');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static('public'));
app.set('views', __dirname + '../views');
app.set('view engine', 'ejs');
app.use('/mail', mailRouter);

app.get("*", (req, res) => {
  res.redirect("/mail");
});

