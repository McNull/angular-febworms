angular.module('myApp').controller('FormDataEditController', function ($scope, form, formData, $location, notifications, febwormsConfig) {

  // The form model
  $scope.form = form;
  $scope.form.data = formData;

  $scope.debug = {
    allowed: febwormsConfig.enableDebugInfo
  };
  
  $scope.onSave = function() {

    if($scope.form.state.$valid) {
      var schemaName = $scope.form.schema.name;
      $scope.form.data.$save({ formId: $scope.form.id }).then(function () {
        notifications.add("Data for " + schemaName + " saved.", 'info', 1);
        $location.path('/form/' + $scope.form.id + '/data');
      });
    }

  };

  $scope.onCancel = function() {
    $location.path('/form/' + $scope.form.id + '/data');
  };

});

// angular.module('myApp').factory('FormEditResolver', function ($route, Form) {
//   return Form.get({ id: $route.current.params.id });
// });

