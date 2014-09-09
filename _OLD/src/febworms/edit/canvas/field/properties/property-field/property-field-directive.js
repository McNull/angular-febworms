angular.module('febworms').directive('febwormsPropertyField', function(febwormsPropertyFieldLinkFn) {

  return {
    restrict: 'AE',
    templateUrl: 'febworms/edit/canvas/field/properties/property-field/property-field.tmpl.html',
    transclude: true,
    scope: true,
    link: febwormsPropertyFieldLinkFn
  };

}).factory('febwormsPropertyFieldLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {
    
    $attrs.$observe('febwormsPropertyField', function(value) {
      $scope.fieldName = value;
    });

    $attrs.$observe('febwormsPropertyFieldLabel', function(value) {
      if(value) {
        $scope.fieldLabel = value;
      }
    });

  };
});