angular.module('febworms').directive('febwormsTabsPane', function(febwormsTabsPaneLinkFn) {
  return {
    require: ['^febwormsTabs'],
    restrict: 'EA',
    transclude: true,
    templateUrl: 'angular-febworms/common/tabs/tabs-pane.ng.html',
    link: febwormsTabsPaneLinkFn,
    scope: true
  };
}).factory('febwormsTabsPaneLinkFn', function() {
  return function($scope, $element, $attrs, $ctrls) {

    $scope.tabs = $ctrls[0];

    $scope.pane = {
      title: $attrs.febwormsTabsPane || $attrs.title,
      order: parseInt($attrs.febwormsTabsPaneOrder || $attrs.order) || 10,
      autoActive: !($attrs.febwormsTabsPaneAutoActive === "false" || $attrs.autoActive === "false")
    };

    $scope.tabs.add($scope.pane);
//
//
//    $scope.pane = {};
//
//    $attrs.$observe('febwormsTabsPane', function(value) {
//      $scope.pane.title = value;
//    });
//
//    $scope.$watch('pane.active', function(value) {
//      $scope.active = value;
//    });
//
//    tabsCtrl.addPane($scope.pane);
  };
});
