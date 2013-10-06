angular.module('myApp').factory('Form',function ($resource) {
  return $resource('/api/form/:id', {id: '@id'});
}).constant('formRoutes', {
    register: function ($routeProvider) {
      $routeProvider.when('/form', {
        templateUrl: 'app/form/index.tmpl.html',
        controller: 'FormIndexController'
      });
      $routeProvider.when('/form/create', {
        templateUrl: 'app/form/edit.tmpl.html',
        controller: 'FormEditController',
        resolve: {
          form: function ($route, Form) {
            return new Form({ schema: {} });
          }
        }
      });
      $routeProvider.when('/form/edit/:id', {
        templateUrl: 'app/form/edit.tmpl.html',
        controller: 'FormEditController',
        resolve: {
          form: function ($route, Form) {
            return Form.get({ id: $route.current.params.id }).$promise;
          }
        }
      });
    }
  });
