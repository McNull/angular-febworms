angular.module('myApp').controller('FormEditController', function ($scope, form, $location, notifications) {

  // The form model
  $scope.form = form;

  $scope.preview = null;

  $scope.togglePreview = function() {
    if($scope.isFormValid()) {
      if($scope.preview) {
        $scope.preview = null;
      } else {
        $scope.preview = angular.copy($scope.form);
      }
    }
  };

  $scope.isFormValid = function() {
    return $scope.appForm && $scope.appForm.$valid &&
           $scope.form.schema && !$scope.form.schema.$_invalid;
  };

  $scope.save = function () {
    if ($scope.isFormValid()) {
      var name = $scope.form.name;

      (function (name) {
        $scope.form.$save().then(function () {
          notifications.add("Schema for " + name + " saved.", 'info', 1);
          $location.path('/form');
        });
      })(name);
    }
  };

  $scope.cancel = function () {
    if ($scope.isFormValid()) {
      var name = $scope.form.name;

      (function (name) {
        $scope.form.$save().then(function () {
          notifications.add("Schema for " + name + " saved.", 'info', 1);
          $location.path('/form');
        });
      })(name);
    }
  };



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
