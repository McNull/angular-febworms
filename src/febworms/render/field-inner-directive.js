angular.module('febworms').directive('febwormsRenderFieldInner', function(febwormsUtils) {

  return {
    replace: true,
    template: '<div class="febworms-field-inner" ng-include="templateUrl"></div>',
    scope: {
      field: '=',
      ngModel: '=?',
      tabIndex: '=?'
    },
    link: function($scope, $element, $attrs) {

      if($scope.tabIndex === undefined) {
        $scope.tabIndex = 'auto';
      }

      if($scope.ngModel === undefined) {
        $scope.ngModel = $scope.field.value;
      }

      $scope.templateUrl = febwormsUtils.getTemplateUrl($scope.field);
    }
  };

});
