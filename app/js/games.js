angular.module('myApp.games', [])

.directive('waitingScreen', function($q, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'partials/games/waiting.html',
  };
})

// tap
.directive('tapGame', function($q, gameRunner) {
  return {
    restrict: 'E',
    templateUrl: 'partials/games/tap.html',
    link: function($scope) {
      var gameCtrl = $scope.gameCtrl;
      $scope.maxTaps = 20;
      $scope.range = function(min, max) {
        var input = [];
        for (var i = min; i <= max; i++) {
          input.push(i);
        }
        return input;
      };

      gameCtrl.registerGame('tap', function() {
        var deferred = $q.defer();
        $scope.gameMetadata.$watch(function() {
          var winners = gameRunner.getHighWinners($scope.gameData,
            $scope.players, $scope.maxTaps);
          if (winners != null) {
            deferred.resolve(winners);
          }
        });
        return deferred.promise;
      });
    }
  };
})

// shake
.directive('shakeGame', function($q, gameRunner) {
  return {
    restrict: 'E',
    templateUrl: 'partials/games/shake.html',
    link: function($scope) {
      $scope.maxTaps = 20;

      $scope.gameCtrl.registerGame('shake', function() {
        var deferred = $q.defer();
        $scope.gameMetadata.$watch(function() {
          var winners = gameRunner.getHighWinners($scope.gameData,
            $scope.players, $scope.maxTaps);
          if (winners != null) {
            deferred.resolve(winners);
          }
        });
        return deferred.promise;
      });
    }
  };
});
