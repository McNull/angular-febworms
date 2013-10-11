angular.module('febworms').directive('febwormsCanvas', function() {
  return {
    templateUrl: 'febworms/edit/canvas/febworms-canvas.tmpl.html',
    restrict: 'A',
    controller: 'febwormsCanvasController'
  };
}).controller('febwormsCanvasController', function($scope) {

  }).directive('febwormsCanvasFieldValidation', function() {
    return {
      templateUrl: 'febworms/edit/canvas/febworms-canvas-field-validation.tmpl.html',
      restrict: 'A',
      replace: true,
      scope: {
        formField: '='
      }
    }
  }).directive('febwormsCanvasFieldProperties', function() {
    return {
      templateUrl: 'febworms/edit/canvas/febworms-canvas-field-properties.tmpl.html',
      restrict: 'A',
      replace: true,
      scope: {
        field: '='
      },
      link: function(scope, iElement, iAttrs) {
        scope.$watch('fieldPropertiesForm.$invalid', function(newValue) {
          scope.field.$_invalid = newValue;
        });
      }
    };
  });