angular.module('myApp', [ 'febworms', 'ngRoute', 'ngResource', 'templates-app' ], null).value('navItems', [

    { text: 'Home', url: '#/' },
    { text: 'Forms', url: '#/form', pattern: "/form(/.*)?" }

  ]).config(function ($routeProvider, formRoutes, formDataRoutes) {

    $routeProvider.when('/', { templateUrl: 'app/main/home.tmpl.html' });

    angular.forEach(formRoutes, function(value, key) {
      $routeProvider.when(key, value);
    });

    angular.forEach(formDataRoutes, function(value, key) {
      $routeProvider.when(key, value);
    });

    $routeProvider.otherwise({ redirectTo: '/' });

  });

