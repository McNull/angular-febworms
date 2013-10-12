angular.module('myApp').controller('FormEditController', function ($scope, form, $location, notifications) {

  $scope.form = form;

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
});

angular.module('myApp').directive('formEdit', function () {
  return {
    restrict: 'A',
    templateUrl: 'app/form/edit/form-edit.tmpl.html',
    controller: 'FormEditController',
    replace: true
  };
});
