const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var port = 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db_celeb');
app.listen(port, () => console.log('server up on port:' + port));

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

const celebRouter = require(__dirname + '/routes/celebRoutes');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});
app.use('/api', celebRouter);
