angular.module('myApp').factory('FormData',function ($resource) {
  return $resource('/api/form/:formId/data/:id', { formId: '@formId', id: '@id'});
}).constant('formDataRoutes', {
    '/form/:formId/data': {
      templateUrl: 'app/form/data/index.tmpl.html',
      controller: 'FormDataIndexController',
      resolve: {
        form: ['$route', 'Form', function($route, Form) {
          return Form.get({ id: $route.current.params.formId }).$promise;
        }],
        formDataItems: ['$route', 'FormData', function ($route, FormData) {
          return FormData.query({ formId: $route.current.params.formId }).$promise;
        }]
      }
    },
    '/form/:formId/data/create': {
      templateUrl: 'app/form/data/edit.tmpl.html',
      controller: 'FormDataEditController',
      resolve: {
        form: ['$route', 'Form', function($route, Form) {
          return Form.get({ id: $route.current.params.formId }).$promise;
        }],
        formData: ['$route', 'FormData', function ($route, FormData) {
          return new FormData({});
        }]
      }
    },
    '/form/:formId/data/edit/:id': {
      templateUrl: 'app/form/data/edit.tmpl.html',
      controller: 'FormDataEditController',
      resolve: {
        form: ['$route', 'Form', function($route, Form) {
          return Form.get({ id: $route.current.params.formId }).$promise;
        }],
        formData: ['$route', 'FormData', function ($route, FormData) {
          return FormData.get({ formId: $route.current.params.formId, id: $route.current.params.id }).$promise;
        }]
      }
    }
  });
