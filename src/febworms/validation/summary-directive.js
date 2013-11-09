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

      var field = { name: $scope.fieldName };
      
      if(febwormsFieldCtrl) {
        field = febwormsFieldCtrl.field();
      } else if(ngFormController) {
        field.state = ngFormController[$scope.fieldName];
      } else {
        throw Error('No febworms-field or form available');
      }

      $scope.field = field;
      $scope.messages = angular.extend({}, febwormsConfig.validation.messages, $scope.validationMessages)
    }
  };
});