// grab the things we need
//http://stackoverflow.com/questions/21664420/array-of-string-in-a-schema-mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    content:  {
        type: String,
        required: true,
        notEmpty: true
    },
    explanation:  {
        type: String,
        required: true,
        notEmpty: true
    },
    isCorrect:  {
        type: Boolean,
        required: true,
        notEmpty: true
    }
})

var questionSchema = new Schema({
    // rating:  {
    //     type: Number,
    //     min: 1,
    //     max: 5,
    //     required: false
    // },
    // title: {
    //     type: String,
    //     required: true,
    //     unique: false
    // },
    content:  {
        type: String,
        required: true,
        notEmpty: true
    },
    questionType: {
        type: String,
        required: true,
        notEmpty: true
    },
    answers: [answerSchema]
    // images:  [{
    //     type: String,
    //     required: false,
    //     notEmpty: true
    // }]
    // ,
    // postedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
}, {
    timestamps: true
});

// create a schema
var quizSchema = new Schema({
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
    questions:[questionSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Quiz = mongoose.model('Quiz', quizSchema);

// make this available to our Node applications
module.exports = Quiz;