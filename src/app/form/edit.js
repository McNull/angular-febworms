angular.module('myApp').controller('FormEditController', function ($scope, form, $location, notifications) {

  $scope.form = form;

//  if ($routeParams.id) {
//    $scope.form = Form.get({ id: $routeParams.id }, function () {
//    }, function () {
//      $location.path('/form');
//    });
//  } else {
//    $scope.form = new Form({ schema: {} });
//  }

  $scope.save = function () {
    if ($scope.myForm.$valid && !$scope.form.schema.$_invalid) {
      var name = $scope.form.name;

      (function (name) {
        $scope.form.$save().then(function () {
          notifications.add("Schema for " + name + " saved.", 'info', 1);
          $location.path('/form');
        });
      })(name);
    }
  }
});

angular.module('myApp').factory('FormEditResolver', function ($route, Form) {
  return Form.get({ id: $route.current.params.id });
  //  $route.current.params
//  return {
//    form: ['$routeParams', 'Form', function ($routeParams, Form) {
//      if ($routeParams.id) {
//        return Form.get({ id: $routeParams.id });
//      } else {
//        return new Form({ schema: {} });
//      }
//    }]
//  };
});

angular.module('myApp').directive('formEdit', function () {
  return {
    restrict: 'A',
    templateUrl: 'app/form/edit/form-edit.tmpl.html',
    controller: 'FormEditController',
    replace: true
  };
});
