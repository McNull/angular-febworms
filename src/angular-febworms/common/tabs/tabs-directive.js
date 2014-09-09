angular.module('febworms').directive('febwormsTabs', function() {
  return {
    require: ['febwormsTabs'],
    restrict: 'EA',
    transclude: true,
    controller: 'febwormsTabsController',
    templateUrl: 'angular-febworms/common/tabs/tabs.ng.html',
    link: function($scope, $element, $attrs, ctrls) {
      
      // This is done here since angular doesn't allow $ in the 'controller as'
      // syntax.
      
      $scope.$_tabCtrl = ctrls[0];
    }
  };
});



