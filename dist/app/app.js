angular.module('myApp', [ 'febworms', 'ngRoute', 'ngResource', 'templates-app' ], null).value('navItems', [

    { text: 'Home', url: '#/' },
    { text: 'Forms', url: '#/form', pattern: "/form(/.*)?" }

  ]).factory('Form', function($resource) {

    return $resource('/api/form/:id', {id: '@id'});

  }).config(function ($routeProvider) {

    $routeProvider.when('/', { templateUrl: 'app/main/home.tmpl.html' });
    $routeProvider.when('/form', { templateUrl: 'app/form/index.tmpl.html' });
    $routeProvider.when('/form/create', { templateUrl: 'app/form/create.tmpl.html' });
    $routeProvider.when('/form/edit/:id', { templateUrl: 'app/form/edit.tmpl.html' });

    $routeProvider.otherwise({ redirectTo: '/' });

  });

