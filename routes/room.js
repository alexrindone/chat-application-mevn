const Room = require('../models/Room')
/* eslint-disable semi */
const router = require('express').Router();

/* GET ALL CHAT ROOMS */
router.get('/', function (req, res, next) {
  Room.find(function (err, rooms) {
    if (err) return next(err);
    res.json(rooms);
  });
});

/* GET ROOM BY ID */
router.get('/:id', function (req, res, next) {
  Room.findById(req.params.id, function (err, room) {
    if (err) return next(err);
    res.json(room);
  });
});

/* SAVE ROOM */
router.post('/', function (req, res, next) {
  Room.create(req.body, function (err, room) {
    if (err) return next(err);
    res.json(room);
  });
});

/* UPDATE ROOM */
router.put('/:id', function (req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, room) {
    if (err) return next(err);
    res.json(room);
  });
});

/* DELETE ROOM */
router.delete('/:id', function (req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, room) {
    if (err) return next(err);
    res.json(room);
  });
});

module.exports = router;
