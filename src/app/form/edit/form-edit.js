angular.module('myApp').controller('FormEditController', function ($scope, Form, $location, notifications, $routeParams) {

  if ($routeParams.id) {
    $scope.form = Form.get({ id: $routeParams.id }, function() {}, function () {
        $location.path('/form');
      });
  } else {
    $scope.form = new Form({ schema: {} });
  }

  $scope.save = function () {
    if ($scope.myForm.$valid) {
      var name = $scope.form.schema.name;

      (function (name) {
        $scope.form.$save().then(function () {
          notifications.add("Schema for " + name + " saved.");
          $location.path('/form');
        });
      })(name);
    }
  }
});

angular.module('myApp').directive('formEdit', function () {
  return {
    restrict: 'A',
    templateUrl: 'app/form/edit/form-edit.tmpl.html',
    controller: 'FormEditController',
    replace: true
  };
});
