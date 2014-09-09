angular.module('febworms').directive('febwormsEditValidationMessage', function(febwormsEditValidationMessageLinkFn) {
  return {
    templateUrl: 'angular-febworms/edit/canvas/field/properties/validation/validation-message.ng.html',
    link: febwormsEditValidationMessageLinkFn,
    scope: true
  };
}).factory('febwormsEditValidationMessageLinkFn', function() {

  var DEFAULT_TOOLTIP = "Enter a error message here that will be shown if this validation fails. If this field is empty a default message will be used.";
  
  return function($scope, $element, $attrs, ctrls) {
    $attrs.$observe('febwormsEditValidationMessage', function(value) {
      $scope.validationType = value;
    });

    $attrs.$observe('febwormsEditValidationTooltip', function(value) {
      value = value || DEFAULT_TOOLTIP;
      $scope.tooltip = value;
    });
  };
});