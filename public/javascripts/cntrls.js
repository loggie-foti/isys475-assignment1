angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    console.log(AuthService.getUserStatus());
    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid Username and/or Password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
}]);
angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    $scope.logout = function () {
      console.log(AuthService.getUserStatus());
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };
}]);
angular.module('myApp').controller('regController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {
    console.log(AuthService.getUserStatus());
    $scope.register = function () {
      $scope.error = false;
      $scope.disabled = true;
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };
}]);