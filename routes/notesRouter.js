var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Notes = require('../models/notes');

//var Verify = require('./verify');

var notesRouter = express.Router();
notesRouter.use(bodyParser.json());

notesRouter.route('/')
.get(function (req, res, next) {
    Notes.find({})
        //.populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(function (req, res, next) {
    Notes.create(req.body, function (err, deck) {
        if (err) throw err;
        console.log('Deck created!');
        var id = deck._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the notes with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Notes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

notesRouter.route('/:noteId')
.get(function (req, res, next) {
    Notes.findById(req.params.noteId)        
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function (req, res, next) {
    Notes.findByIdAndUpdate(req.params.noteId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function (req, res, next) {
        Notes.findByIdAndRemove(req.params.noteId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = notesRouter