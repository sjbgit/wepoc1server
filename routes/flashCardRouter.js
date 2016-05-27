var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Decks = require('../models/deck');

//var Verify = require('./verify');

var deckRouter = express.Router();
deckRouter.use(bodyParser.json());

deckRouter.route('/')
.get(function (req, res, next) {
    Decks.find({})
        //.populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(function (req, res, next) {
    Decks.create(req.body, function (err, deck) {
        if (err) throw err;
        console.log('Deck created!');
        var id = deck._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the deck with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Decks.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

deckRouter.route('/:deckId')
.get(function (req, res, next) {
    Decks.findById(req.params.deckId)        
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function (req, res, next) {
    Decks.findByIdAndUpdate(req.params.deckId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function (req, res, next) {
        Decks.findByIdAndRemove(req.params.deckId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = deckRouter