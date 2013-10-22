angular.module('febworms')
  .directive('febwormsNoFocus', function() {
    return {
      priority: 9999,
      restrict: 'AEC',
      link: function($scope, $element, $attrs) {
        console.log($element);
      }
    };
  });

