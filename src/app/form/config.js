angular.module('myApp').factory('Form',function ($resource) {
  return $resource('/api/form/:id', {id: '@id'});
}).constant('formRoutes', {
    '/form': {
      templateUrl: 'app/form/index.tmpl.html',
      controller: 'FormIndexController'
    },
    '/form/create': {
      templateUrl: 'app/form/edit.tmpl.html',
      controller: 'FormEditController',
      resolve: {
        form: ['$route', 'Form', function ($route, Form) {
          return new Form({ schema: {} });
        }]
      }
    },
    '/form/edit/:id': {
      templateUrl: 'app/form/edit.tmpl.html',
      controller: 'FormEditController',
      resolve: {
        form: ['$route', 'Form', function ($route, Form) {
          return Form.get({ id: $route.current.params.id }).$promise;
        }]
      }
    },
    '/form/:id': {
      templateUrl: 'app/form/display.tmpl.html',
      controller: 'FormDisplayController',
      resolve: {
        form: ['$route', 'Form', function ($route, Form) {
          return Form.get({ id: $route.current.params.id }).$promise;
        }]
      }
    }
  });
