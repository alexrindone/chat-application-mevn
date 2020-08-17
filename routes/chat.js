const Chat = require('../models/Chat');

/* eslint-disable semi */
const express = require('express');
const router = express.Router();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

/* GET ALL CHATS */
router.get('/', function (req, res, next) {
  Chat.find(function (err, chats) {
    if (err) return next(err);
    res.json(chats);
  });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', function (req, res, next) {
  Chat.findById(function (err, chat) {
    if (err) return next(err);
    res.json(chat);
  });
});

/* SAVE CHAT */
router.post('/', function (req, res, next) {
  Chat.create(req.body, function (err, chat) {
    if (err) return next(err);
    res.json(chat);
  });
});

/* UPDATE CHAT */
router.put('/:id', function (req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, chat) {
    if (err) return next(err);
    res.json(chat);
  });
});

/* DELETE CHAT BY ID */
router.delete('/:id', function (req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, chat) {
    if (err) return next(err);
    res.json(chat);
  });
});

server.listen(4000);

// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});
module.exports = router;
