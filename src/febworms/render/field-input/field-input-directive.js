angular.module('febworms').directive('febwormsFieldInput', function(febwormsUtils) {

  return {
    require: ['^febwormsForm', 'ngModel', 'febwormsFieldInput'],
    scope: {
      schema: '=febwormsFieldInput',
    },
    controller: 'febwormsFieldInputController',
    link: function($scope, $element, $attrs, ctrls) {

      var febwormsFormCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      var febwormsFieldInputCtrl = ctrls[2];

      $scope.form = febwormsFormCtrl.model;

      $scope.field = febwormsFieldInputCtrl.init($scope.schema, ngModelCtrl);

      $scope.$watch('schema.name', function(value, oldValue) {
        if ($scope.form.state) {
          $scope.form.state.$removeControl(ngModelCtrl);
        }

        ngModelCtrl.$name = value;
        $scope.field.name = value;

        if ($scope.form.state) {
          $scope.form.state.$addControl(ngModelCtrl);
        }
      });
    }
  };
});