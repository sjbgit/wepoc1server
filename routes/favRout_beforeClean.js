var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
        
    var userId = req.decoded._doc._id;
    
    Favorites.findOne({ 'postedBy': userId })
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
            if (err) throw err;
            res.json(favorite);
        });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    
    var userId = req.decoded._doc._id;
    var dishId = req.body._id;
    req.body.postedBy = req.decoded._doc._id;
    req.body.dishes = [];
    req.body.dishes.push({"_id": req.body._id});

    Favorites.findOne({ 'postedBy': userId }, function (err, favorite) {
        
            if (favorite) {
                console.log('favorite exists');

                var dishes = favorite.dishes;
                console.log(dishes);
                var index = dishes.indexOf(dishId);
                console.log('index of: ' + index);
                if (index < 0) {
                    console.log('adding dish to existing favorite');
                    dishes.push({"_id": dishId});

                    favorite.save(function (err, result) {
                        if (err) throw err;
                        console.log('favorite updated with new dish');
                        //return favorite
                        res.json(result);
                    });
                }
                else {
                    console.log('dish already exists in favorite - doing nothing');
                    res.json(favorite);
                }
            }
            //Push dish on to array if it is not there
            else {
                console.log('favorite does not exist')

                req.body._id = new ObjectId();
                Favorites.create(req.body, function (err, favorite) {
                    if (err) throw err;
                    console.log('favorite created!');
                    var id = favorite._id;
                    //return favorite as json
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Created new favorite with id: ' + id);
                });
            }

        if (err) throw err;
    });
    
})

//delete for user
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    var userId = req.decoded._doc._id;
    Favorites.remove({ 'postedBy': userId }, function (err, resp) {
        if (err) throw err;
        //clean up response
        res.json(resp);
    });
});

//delete item
favoritesRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    
    var userId = req.decoded._doc._id;
    var dishId = req.params.dishId;

    Favorites.findOne({ 'postedBy': userId }, function (err, favorite) {
        
            if (favorite) {
                console.log('favorite exists');

                var dishes = favorite.dishes;
                console.log(dishes);
                var index = dishes.indexOf(dishId);
                console.log('index of: ' + index);
                if (index >= 0) {
                    console.log('removing dish to existing favorite');
                    
                    dishes = dishes.splice(index, 1);
                    console.log('dishes after splice');
                    console.log(dishes);

                    favorite.save(function (err, result) {
                        if (err) throw err;
                        console.log('favorite updated with removed dish');
                        res.json(result);
                    });
                }
                else {
                    console.log('dish does not exists in favorite - doing nothing');
                    res.json(favorite);
                }
            }
            //Push dish on to array if it is not there
            else {
                console.log('favorite does not exist - cannot delete')                
            }

        if (err) throw err;
    });

});

module.exports = favoritesRouter;
