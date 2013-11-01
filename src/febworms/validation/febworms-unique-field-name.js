angular.module('febworms').directive('febwormsUniqueFieldName', function () {

  var changeTick = 0;

  function validate(ngModel, field, fields) {
    var valid = true;
    var schemaField;

    for (var i = 0; i < fields.length; i++) {
      schemaField = fields[i];
      if (schemaField !== field && field.name === schemaField.name) {
        valid = false;
        break;
      }
    }

    ngModel.$setValidity('unique', valid);
  }

  return {
    require: 'ngModel',
    link: function ($scope, $element, $attrs, ngModel) {

      if(!$scope.schema) {
        throw Error('No schema on scope');
      }
      
      var field = $scope.field;
      var fields = $scope.schema.fields;

      $scope.$watch('field.name', function () {
        ++changeTick;
      });

      $scope.$watch(function() { return changeTick; }, function() {
        validate(ngModel, field, fields);
      });

      validate(ngModel, field, fields);
    }
  };
});
