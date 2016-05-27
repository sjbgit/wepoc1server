var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Quizzes = require('../models/quiz');

//var Verify = require('./verify');

var quizRouter = express.Router();
quizRouter.use(bodyParser.json());

quizRouter.route('/')
.get(function (req, res, next) {
    Quizzes.find({})
        //.populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(function (req, res, next) {
    Quizzes.create(req.body, function (err, deck) {
        if (err) throw err;
        console.log('Quiz created!');
        var id = deck._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the quiz with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Quizzes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

quizRouter.route('/:quizId')
.get(function (req, res, next) {
    Quizzes.findById(req.params.quizId)        
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function (req, res, next) {
    Quizzes.findByIdAndUpdate(req.params.quizId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function (req, res, next) {
        Quizzes.findByIdAndRemove(req.params.quizId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = quizRouter