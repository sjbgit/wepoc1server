// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//https://www.npmjs.com/package/mongoose-currency
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var noteSchema = new Schema({
    // rating:  {
    //     type: Number,
    //     min: 1,
    //     max: 5,
    //     required: false
    // },
    title: {
        type: String,
        required: true,
        unique: false
    },
    content:  {
        type: String,
        required: true,
        notEmpty: true
    },
    images:  [{
        type: String,
        required: false,
        notEmpty: true
    }]
    // ,
    // postedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
}, {
    timestamps: true
});

// create a schema
var notesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },    
    category: {
        type: String,
        required: false
    },    
    notes:[noteSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Notes = mongoose.model('Notes', notesSchema);

// make this available to our Node applications
module.exports = Notes;