angular.module('myApp', [ 'febworms', 'ngRoute', 'ngResource', 'templates-app' ], null).value('navItems', [

    { text: 'Home', url: '#/' },
    { text: 'Forms', url: '#/form', pattern: "/form(/.*)?" }

  ]).config(function ($routeProvider, formRoutes) {

    $routeProvider.when('/', { templateUrl: 'app/main/home.tmpl.html' });
    formRoutes.register($routeProvider);
    $routeProvider.otherwise({ redirectTo: '/' });

  });
