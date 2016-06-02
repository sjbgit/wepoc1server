angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap', 'ngResource']);
angular.module('ui.bootstrap.demo').controller('TabsDemoCtrl', function ($scope, $window, testFactory, flashCardFactory, notesFactory, quizFactory) {

  $scope.totalItems = 64;
  $scope.currentPage = 4;
  
  $scope.notes = [];
  
  //$scope.testDecks = flashCardFactory.query();
var query = flashCardFactory.query();
query.$promise.then(function(data) {
     $scope.testDecks = data;
     console.log($scope.testDecks);
     
     $scope.decks = data;
     //$scope.decks.unshift(data);
     // Do whatever when the request is finished
});

var nquery = notesFactory.query();
nquery.$promise.then(function(data) {
     $scope.testNotes = data;
     console.log($scope.testNotes);
     $scope.notes = data;
     // Do whatever when the request is finished
});

var qquery = quizFactory.query();
qquery.$promise.then(function(data) {
     $scope.testQuizzes = data;
     console.log($scope.testQuizzes);
     // Do whatever when the request is finished
});

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    //$log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;

  $scope.decks = testFactory.get({user: 1});
  $scope.selectedDeck = {};
  $scope.currentCard = {};

  $scope.myInterval = 3000;


  $scope.setSelectedDeck = function(deck) {
    $scope.selectedDeck = deck;
    $scope.currentCard = deck.cards && deck.cards.length > 0 ? deck.cards[0] : {};
  }
  
  $scope.setSelectedNote = function(note) {
    $scope.selectedNote = note;
    $scope.currentNote = note.notes && note.notes.length > 0 ? note.notes[0] : {};
  }

  $scope.decks = [
  {
    title: "this is a test title1", id: 1, cards: [
        {
          title: "first card title",
          contents: [ "first"]
        },
        {
          title: "second card title",
          contents: [ "second"]
        },
        {
          title: "third card title",
          contents: [ "third"]
        }


      ]
  },
  {
    title: "this is a test title2", id: 2
  },
  {
    title: "this is a test title3", id: 3
  },
  {
    title: "this is a test title4", id: 4
  },
  {
    title: "this is a test title5", id: 5
  },
  {
    title: "this is a test title6", id: 6
  },
  {
    title: "this is a test title6", id: 7
  },
  {
    title: "this is a test title8", id: 8
  }

  ];



  $scope.cardIndex = 0;

  $scope.selectedDeck = $scope.decks[0];

  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

  $scope.model = {
    name: 'Tabs'
  };
  
  
  
  ///////////////////////////////// CAROUSEL ///////////////////////////////////
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      //image: 'http://lorempixel.com/' + newWidth + '/300',
      image: './notes_pic.JPG',
      text: ['Test1','Test2','Test3','Test4'][slides.length % 4],
      id: currIndex++
    });
  };
  
  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }
  ////////////////////////////// END CAROUSEL ////////////////////////////////////
  
  ////////////////////////////// QUIZ ///////////////////////////////////////////
  
  $scope.currentQuiz = {
    questions: [
      {
        content: 'First quiz question',
        answers: [
          { content: 'First answer', explanation: 'Expain why this is correct', isCorrect: true },
			    { content: 'Second answer', explanation: 'Explain why this is incorrect', isCorrect: false },
          //{ content: 'Third answer', explanation: 'Explain why this is incorrect', isCorrect: false },
        ]
        
      }
    ]
  };
  
  $scope.currentQuestion = $scope.currentQuiz.questions[0];
  
  ///////////////////////////////////////////////////////////////////////////////
});

angular.module('ui.bootstrap.demo')
    //https://devdactic.com/improving-rest-with-ngresource/
        .constant("test_baseURL", 'http://jsonplaceholder.typicode.com/users/:user') //"http://localhost:3000/")
        .constant("baseURL", 'http://localhost:3000/')
        .factory('testFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
          var data = $resource('http://jsonplaceholder.typicode.com/users/:user', {user: '@user'}, {
          update:{
            method:'PUT'
          }
        });
        return data;
      }])
      .factory('flashCardFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
          var data = $resource(baseURL + 'flashCards/:deckId', {deckId: '@deckId'}, {
          update:{
            method:'PUT'
          }
        });
        return data;
      }])
      .factory('notesFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
          var data = $resource(baseURL + 'notes/:noteId', {deckId: '@noteId'}, {
          update:{
            method:'PUT'
          }
        });
        return data;
      }])
      .factory('quizFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
          var data = $resource(baseURL + 'quizzes/:quizId', {quizId: '@quizId'}, {
          update:{
            method:'PUT'
          }
        });
        return data;
      }])
;//closing semicolon