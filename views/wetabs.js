angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap', 'ngResource']);

angular.module('ui.bootstrap.demo').controller('FlashCardsCtrl', function ($scope, $window, testFactory, flashCardFactory, notesFactory, quizFactory) {
  
  // $scope.totalItems = 64;
  // $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
    $scope.currentCard = $scope.selectedDeck.cards[$scope.currentPage - 1];
  };

  $scope.maxSize = 0;
  $scope.totalItems = 0;
  $scope.currentPage = 0;
  
  // $scope.maxSize = 5;
  // $scope.bigTotalItems = 175;
  // $scope.bigCurrentPage = 1;
  
  // $scope.totalPages = 5;
  // $scope.currentPage = 1;
  
  
  //$scope.totalItems = 64;
  //$scope.currentPage = 1;
  
  $scope.notes = [];
  
  //$scope.testDecks = flashCardFactory.query();
var query = flashCardFactory.query();
query.$promise.then(function(data) {
     $scope.testDecks = data;
     console.log($scope.testDecks);
     
     $scope.decks = data;
     $scope.setSelectedDeck(data[0]);
     //$scope.bigTotalItems = data.cards.length;
     //$scope.bigCurrentPage = 1;
     //$scope.totalItems = 64;
     
     //$scope.decks.unshift(data);
     // Do whatever when the request is finished
});

 
  $scope.addDeck = function() {
    
    //create new deck
    //set deck to current deck         
  }


  $scope.submit = function(deckToSave) {
    var x = deckToSave;
    console.log(x);
    flashCardFactory.update({deckId: deckToSave._id},deckToSave);
  }
  
  $scope.addCard = function(selectedDeck) {
    
    //add card to selected deck
    //update number of pages
    //set page to that card's index       
  }
  
  $scope.deleteCard = function(currentCard) {
    
    //prompt user to confirm delete 
    //if yes, set number of pages
    //set current page either to first page or page just before deleted item
       
  }
  

  $scope.decks = testFactory.get({user: 1});
  $scope.selectedDeck = {};
  $scope.currentCard = {};

  $scope.myInterval = 3000;


  $scope.setSelectedDeck = function(deck) {
    $scope.selectedDeck = deck;
    $scope.currentCard = deck.cards && deck.cards.length > 0 ? deck.cards[0] : {};
    $scope.currentPage = 1;
    $scope.totalItems = deck.cards.length * 10;
    //$scope.bigCurrentPage = 1;
    // $scope.bigTotalItems = deck.cards.length;
    // $scope.totalItems = deck.cards.length;
    // $scope.totalPages = deck.cards.length;
    // $scope.totalItems = deck.cards.length;
      
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

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

  $scope.model = {
    name: 'Tabs'
  };

});

angular.module('ui.bootstrap.demo').controller('NotesCtrl', function ($scope, $window, testFactory, flashCardFactory, notesFactory, quizFactory) {
  
  $scope.totalItems = 64;
  $scope.currentPage = 4;
  
  $scope.notes = [];
 
var nquery = notesFactory.query();
nquery.$promise.then(function(data) {
     $scope.testNotes = data;
     console.log($scope.testNotes);
     $scope.notes = data;
     
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


  $scope.setSelectedNote = function(note) {
    $scope.selectedNote = note;
    $scope.currentNote = note.notes && note.notes.length > 0 ? note.notes[0] : {};
  }

  $scope.cardIndex = 0;

  $scope.selectedDeck = $scope.decks[0];
  
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
  
});

angular.module('ui.bootstrap.demo').controller('QuizzesCtrl', function ($scope, $window, testFactory, flashCardFactory, notesFactory, quizFactory) {

  $scope.totalItems = 64;
  $scope.currentPage = 4;
  
  $scope.notes = [];
  
  $scope.quizzes = [];
  
var qquery = quizFactory.query();
qquery.$promise.then(function(data) {
     $scope.quizzes = data;
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
  
  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

  $scope.model = {
    name: 'Tabs'
  };
  
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
        .constant("test_baseURL", 'http://jsonplaceholder.typicode.com/users/:user') 
        .constant("baseURL", 'http://westudypoc01.azurewebsites.net/') 
        //.constant("baseURL", 'http://localhost:3000/')
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


//EXAMPLE NESTED UPDATE
/*
.factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id/comments/:commentId", {id:"@Id", commentId: "@CommentId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])
*/

/*
 $scope.dish = menuFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        */
        
 /*       
         $scope.submitComment = function () {

        commentFactory.save({id: $stateParams.id}, $scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: ""
        };
    }
    */