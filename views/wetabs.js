angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap', 'ngResource']);
angular.module('ui.bootstrap.demo').controller('TabsDemoCtrl', function ($scope, $window, testFactory) {

   $scope.totalItems = 64;
  $scope.currentPage = 4;

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
});

angular.module('ui.bootstrap.demo')
    //https://devdactic.com/improving-rest-with-ngresource/
        .constant("baseURL", 'http://jsonplaceholder.typicode.com/users/:user') //"http://localhost:3000/")
        .factory('testFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
          var data = $resource('http://jsonplaceholder.typicode.com/users/:user', {user: '@user'}, {
          update:{
            method:'PUT'
          }
        });
        return data;
      }])
;//closing semicolon