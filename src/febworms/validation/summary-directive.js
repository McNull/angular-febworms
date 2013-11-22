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
      $scope.form = febwormsFieldCtrl.form();

    } else if (ngFormController) {
      
      $scope.form = {
        state: ngFormController
      };

      $scope.$watch('fieldName', function(value) {
        $scope.field = {
          name: value,
          state: ngFormController[value]
        };
      });
    }

    // Whenever the form designer edits a custom message but decides to delete it later a "" is leftover.
    // I don't feel like setting all kinds of watchers so we'll fix that here

    if($scope.validationMessages) {
      angular.forEach($scope.validationMessages, function(value, key) {
        if(!value) {
          delete $scope.validationMessages[key];
        }
      });
    }

    $scope.messages = angular.extend({}, febwormsConfig.validation.messages, $scope.validationMessages);
  };

});