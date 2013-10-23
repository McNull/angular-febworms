angular.module('febworms')
  .directive('febwormsNoFocus', function() {
    return {
      priority: 0,
      restrict: 'AEC',
      link: function($scope, $element, $attrs) {

        $scope.$on('$includeContentLoaded', function($event) {
          console.log($event);
        });
      }
    };
  });

