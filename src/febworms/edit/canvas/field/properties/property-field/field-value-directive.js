angular.module('febworms').directive('febwormsPropertyFieldValue', function(febwormsPropertyFieldValueLinkFn) {

  return {
    require: ['^form'],
    templateUrl: 'febworms/edit/canvas/field/properties/property-field/field-value.tmpl.html',
    transclude: true,
    link: febwormsPropertyFieldValueLinkFn
  };

}).factory('febwormsPropertyFieldValueLinkFn', function($parse) {



  return function($scope, $element, $attrs, ctrls) {

    $scope.draw = true;
    var frmCtrl = ctrls[0];
    var oldViewValue;

    $scope.$watch('field.$_redraw', function(value) {

      if (value) {

        var ngModelCtrl = frmCtrl['fieldValue'];

        if(ngModelCtrl) {
          oldViewValue = ngModelCtrl.$viewValue;
        }

        $scope.draw = false;
        $scope.field.$_redraw = false;
      } else {
        $scope.draw = true;
        $element = $element;
      }
    });

    $scope.$watch(function() { return frmCtrl['fieldValue']; }, function(ngModelCtrl) {
      if(ngModelCtrl && oldViewValue) {
        ngModelCtrl.$setViewValue(oldViewValue);
        ngModelCtrl.$render();
        oldViewValue = undefined;
      }
    });
  };
}).directive('febwormsFieldRedraw', function() {
  return {
    require: ['ngModel'],
    link: function($scope, $element, $attrs, ctrls) {

      $scope.$watch($attrs.ngModel, function(value) {
        $scope.field.$_redraw = true;
      });
    }
  };
});
