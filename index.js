var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var appKeys = require('./keys/appKeys');
var backendPort = appKeys.BACKEND_PORT
var mailRouter = require('./routes/mail');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/mail', mailRouter);

app.get("*", (req, res) => {
  res.redirect("/mail");
});

app.listen(backendPort, () => {
  console.log(`Backend Started on ${backendPort}`);
})
