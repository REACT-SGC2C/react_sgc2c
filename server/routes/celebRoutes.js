const Router = require('express').Router;
const Celeb = require('../models/celebGuest');
const bodyParser = require('body-parser').json();
const serverErrHandler = require(__dirname + '/../lib/serverErrHandler');

var celebRouter = module.exports = Router();

celebRouter.get('/celebs', (req, res) => {
  console.log('/celebs GET routes work!');
  Celeb.find(null, (err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

celebRouter.post('/celebs', bodyParser, (req, res) => {
  console.log('/celebs POST route works!');
  var newCeleb = new Celeb(req.body);
  newCeleb.save((err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

celebRouter.put('/celebs/:id', bodyParser, (req, res) => {
  var celebData = req.body;
  delete celebData._id;
  Celeb.update({ _id: req.params.id }, celebData, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'Interview sign-up complete!' });
  });
});

celebRouter.delete('/celebs/:id', (req, res) => {
  Celeb.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'Interview sign-up canceled!' });
  });
});
