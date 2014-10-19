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
      autoActive: !($attrs.febwormsTabsPaneAutoActive === "false" || $attrs.autoActive === "false"),
      renderAlways: $attrs.febwormsTabsPaneRenderAlways === "true" || $attrs.renderAlways === "true"
    };

    $scope.$watch($attrs.disabled, function(value) {
      $scope.pane.disabled = value;
    });

    $scope.tabs.add($scope.pane);
  };
});
