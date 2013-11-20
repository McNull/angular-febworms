angular.module('febworms').directive('febwormsPropertyFieldValidation', function(febwormsPropertyFieldValidationLinkFn) {
  return {
    restrict: 'A',
    templateUrl: 'febworms/edit/canvas/field/properties/validation/validation.tmpl.html',
    link: febwormsPropertyFieldValidationLinkFn
  };
}).factory('febwormsPropertyFieldValidationLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    $scope.patternOptions = [
      { value: '\\d+', text: 'Number' },
      { value: '\\', text: 'Invalid' },
      { value: '^gedoe$', text: 'gedoe' },
      { value: 'gedoe', text: 'gedoe anywhere' }
    ];

    $scope.field.validation = $scope.field.validation || {};
    $scope.field.validation.messages = $scope.field.validation.messages || {};

    $scope.fields = {
      required: false,
      minlength: false,
      maxlength: false,
      pattern: false
    };

    $scope.$watch($attrs['febwormsPropertyFieldValidation'], function(value) {
      $scope.fields = angular.extend($scope.fields, value);
    });
  };
});