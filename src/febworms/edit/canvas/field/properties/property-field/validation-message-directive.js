angular.module('febworms').directive('febwormsEditValidationMessage', function(febwormsEditValidationMessageLinkFn) {
  return {
    templateUrl: 'febworms/edit/canvas/field/properties/property-field/validation-message.tmpl.html',
    link: febwormsEditValidationMessageLinkFn,
    scope: true
  };
}).factory('febwormsEditValidationMessageLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {
    $attrs.$observe('febwormsEditValidationMessage', function(value) {
      $scope.validationType = value;
    });

    $attrs.$observe('febwormsEditValidationTooltip', function(value) {
      if(value) {
        $scope.tooltip = value;
      }
    });
  };
});