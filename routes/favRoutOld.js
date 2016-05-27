var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    //findone by the user id off of the req.decoded._doc._id
    Favorites.find({})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})


.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    //findone favorite by postby, if not exist create it add add dish,
    //otherwise just add the dish to it?
    //have to intervene here for user id and dishes?
    //findOne({ 'name.last': 'Ghost' })
    var userId = req.decoded._doc._id;
    var dishId = req.body._id;
    req.body.postedBy = req.decoded._doc._id;
    req.body.dishes = [];
    req.body.dishes.push({"_id": req.body._id});

    Favorites.findOne({ 'postedBy': userId }, function (err, favorite) {
        //.populate('postedBy')
        //.populate('dishes')
        //.exec(function (err, favorite) {

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
                        res.json(result);
                    });
                }
                else {
                    console.log('dish already exists in favorite - doing nothing');
                    res.json(favorite);
                }
                
                

                /*
                favorite.save(function (err, result) {
                    if (err) throw err;
                    
                    //res.json(result);
                    console.log('favorite updated with new dish');

                    /*
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Dish successfully added to favorites');
                    */
                //});


                //console.log(favorite);
                //Favorites.create()
                /*
                Favorites.create(req.body, function (err, favorite) {
                    if (err) throw err;
                    console.log('favorite created!');
                    var id = favorite._id;
                    //favorite.postedBy = req.decoded._doc._id;
                    //favorite.dishes.push(req.body);

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Added the favorite with id: ' + id);
                });
                */
            }
            //Push dish on to array if it is not there
            else {
                console.log('favorite does not exist')

                Favorites.create(req.body, function (err, favorite) {
                    if (err) throw err;
                    console.log('favorite created!');
                    var id = favorite._id;
                    //favorite.postedBy = req.decoded._doc._id;
                    //favorite.dishes.push(req.body);

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Created new favorite with id: ' + id);
                });
            }

        if (err) throw err;
        //console.log(favorite);
        //res.json(favorite);
    });
    
    /*
    Favorites.create(req.body, function (err, favorite) {
        if (err) throw err;
        console.log('favorite created!');
        var id = favorite._id;
        favorite.postedBy = req.decoded._doc._id;
        favorite.dishes.push(req.body);

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the favorite with id: ' + id);
    });
    */
})

/*
//GOOD WORKING START
//WILL WE HAVE TO FIND A FAVORITE BY USER ID? 
.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    //findone favorite by postby, if not exist create it add add dish,
    //otherwise just add the dish to it?
    //have to intervene here for user id and dishes?

    req.body.postedBy = req.decoded._doc._id;
    req.body.dishes = [];
    req.body.dishes.push({"_id": req.body._id});
    Favorites.create(req.body, function (err, favorite) {
        if (err) throw err;
        console.log('favorite created!');
        var id = favorite._id;
        favorite.postedBy = req.decoded._doc._id;
        favorite.dishes.push(req.body);

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the favorite with id: ' + id);
    });
})
*/
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoritesRouter.route('/:favoriteId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findById(req.params.favoriteId, function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})
/*
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Favorites.findByIdAndUpdate(req.params.favoriteId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})
*/

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findByIdAndRemove(req.params.favoriteId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = favoritesRouter;
