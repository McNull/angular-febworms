angular.module('febworms').directive('febwormsTabsPane', function(febwormsTabsPaneLinkFn) {
  return {
    require: ['^febwormsTabs'],
    restrict: 'EA',
    scope: {
      active: '=?febwormsTabsPaneActive'
    },
    transclude: true,
    templateUrl: 'angular-febworms/common/tabs/tabs-pane.ng.html',
    link: febwormsTabsPaneLinkFn
  };
}).factory('febwormsTabsPaneLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    var tabsCtrl = ctrls[0];
    
    $scope.pane = {};
    
    $attrs.$observe('febwormsTabsPane', function(value) {
      $scope.pane.title = value;
    });

    $scope.$watch('pane.active', function(value) {
      $scope.active = value;
    });

    tabsCtrl.addPane($scope.pane);
  };
});
