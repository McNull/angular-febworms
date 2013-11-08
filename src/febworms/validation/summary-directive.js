angular.module('febworms').directive('febwormsValidationSummary', function(febwormsConfig) {

  return {
    require: ['^?febwormsField', '^?form'],
    templateUrl: 'febworms/validation/summary.tmpl.html',
    scope: {
      fieldName: '@?febwormsValidationSummary',
      validationMessages: '=?'
    },
    link: function($scope, $element, $attrs, ctrls) {

      var febwormsFieldCtrl = ctrls[0];
      var ngFormController = ctrls[1];

      if(febwormsFieldCtrl) {
        var field = febwormsFieldCtrl.field();
        $scope.fieldName = field.schema.name;
        $scope.fieldState = field.state;
      } else if(ngFormController) {
        $scope.fieldState = ngFormController[$scope.fieldName];
      } else {
        throw Error('No febworms-field or form available');
      }

      if(!$scope.fieldState) {
        throw Error('No fieldState available for field "' + $scope.fieldName + "'");
      }
      
      $scope.messages = angular.extend({}, febwormsConfig.validation.messages, $scope.validationMessages)
    }
  };
});