angular.module('febworms').directive('febwormsPlaceholder', function() {
  /*
    This attribute is only required on TEXTAREA elements. 
    Angular in combination with IE doesn't like placeholder="{{ myExpression }}".
   */
  return { 
    link: function($scope, $element, $attrs) {
      $scope.$watch($attrs.febwormsPlaceholder, function(value) {
        $element.attr('placeholder', value);
      });
    }
  };
});