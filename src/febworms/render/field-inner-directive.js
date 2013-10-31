angular.module('febworms').directive('febwormsRenderFieldInner', function(febwormsUtils) {

  return {
    replace: true,
    template: '<div ng-include="templateUrl"></div>',
    scope: {
      field: '=',
      data: '=?',
      tabIndex: '=?'
    },
    link: function($scope, $element, $attrs) {

      if($scope.tabIndex === undefined) {
        $scope.tabIndex = 'auto';
      }

      if($scope.data === undefined) {
        $scope.data = $scope.field.value;
      }

      $scope.templateUrl = febwormsUtils.getTemplateUrl($scope.field);
    }
  };

});
