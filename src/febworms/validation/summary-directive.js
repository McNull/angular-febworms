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

    if (febwormsFieldCtrl) {
      // Grab the whole field state from the field controller
      $scope.field = febwormsFieldCtrl.field();
    } else if (ngFormController) {
      
      $scope.$watch('fieldName', function(value) {
        $scope.field = {
          name: value,
          state: ngFormController[value]
        };
      });

    }

    $scope.messages = angular.extend({}, febwormsConfig.validation.messages, $scope.validationMessages)
  };

});