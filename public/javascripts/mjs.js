var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: 'htmls/homePage.html'})
    .when('/login', {
      templateUrl: 'htmls/loginPage.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'htmls/regPage.html',
      controller: 'regController',
      access: {restricted: false}
    })
    .when('/one', {
      template: '<h1>Page One!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>Page Two!</h1>',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});
});
myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    console.log(next);
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
    }
  });
});