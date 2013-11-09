angular.module('febworms').directive('febwormsValidationSummary', function(febwormsValidationSummaryLinkFn) {

  return {
    require: ['^?febwormsField', '^?form'],
    templateUrl: 'febworms/validation/summary.tmpl.html',
    scope: {
      fieldName: '@?febwormsValidationSummary',
      validationMessages: '=?febwormsValidationMessages'
    },
    link: febwormsValidationSummaryLinkFn
  };
}).factory('febwormsValidationSummaryLinkFn', function(febwormsConfig) {

  return function($scope, $element, $attrs, ctrls) {

    var febwormsFieldCtrl = ctrls[0];
    var ngFormController = ctrls[1];

    var field;

    if (febwormsFieldCtrl) {
      // Grab the whole field state from the field controller
      field = febwormsFieldCtrl.field();
    } else if (ngFormController) {
      if($scope.fieldName === undefined) {
        throw Error('No field name specified');
      }
      // No field controller available
      // Get the state from the form controller
      field = {
        name: $scope.fieldName
      };
      field.state = ngFormController[$scope.fieldName];
    } else {
      throw Error('No febworms-field or form available');
    }

    $scope.field = field;
    $scope.messages = angular.extend({}, febwormsConfig.validation.messages, $scope.validationMessages)
  };

});