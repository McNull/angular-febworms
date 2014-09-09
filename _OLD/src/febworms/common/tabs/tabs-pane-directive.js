angular.module('febworms').directive('febwormsTabsPane', function(febwormsTabsPaneLinkFn) {
  return {
    require: ['febwormsTabsPane', '^febwormsTabs'],
    restrict: 'EA',
    scope: true,
    transclude: true,
    controller: 'febwormsTabsPaneController',
    templateUrl: 'febworms/common/tabs/tabs-pane.tmpl.html',
    link: febwormsTabsPaneLinkFn
  };
}).factory('febwormsTabsPaneLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {
    
    var paneCtrl = ctrls[0];
    var tabsCtrl = ctrls[1];
    
    // This is done here since angular doesn't allow $ in the 'controller as'
    // syntax.
  
    $scope.$_paneCtrl = paneCtrl;
    
    $attrs.$observe('febwormsTabsPane', function(value) {
      paneCtrl.title = value;  
    });
    
    tabsCtrl.addPane(paneCtrl);
  };
});
