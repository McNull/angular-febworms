angular.module('febworms').directive('febwormsTabs', function() {
  return {
    require: ['febwormsTabs'],
    restrict: 'EA',
    transclude: true,
    controller: 'febwormsTabsController',
    templateUrl: 'angular-febworms/common/tabs/tabs.ng.html',
    scope: {
      'tabs': '=?febwormsTabs'
    },
    link: function($scope, $element, $attrs, $ctrls) {
      $scope.tabs = $ctrls[0];
    }
  };
});



