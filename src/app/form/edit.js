angular.module('myApp').controller('FormEditController', function ($scope, form, $location, notifications) {

  // The form model
  $scope.form = form;

  $scope.onSave = function() {
    var schema = $scope.form.schema;
    $scope.form.$save().then(function () {
      notifications.add("Schema for " + schema.name + " saved.", 'info', 1);
      $location.path('/form');
    });
  };

  $scope.onCancel = function() {
    $location.path('/form');
  };

});

angular.module('myApp').factory('FormEditResolver', function ($route, Form) {
  return Form.get({ id: $route.current.params.id });
});

angular.module('myApp').directive('formEdit', function () {
  return {
    restrict: 'A',
    templateUrl: 'app/form/edit/form-edit.tmpl.html',
    controller: 'FormEditController'
  };
});
