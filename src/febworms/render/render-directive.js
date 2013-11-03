angular.module('febworms').directive('febwormsRender', function() {

  return {
    restrict: 'AE',
    scope: {
      schema: "=",
      form: "=?ngModel"
    },
    templateUrl: 'febworms/render/render.tmpl.html',
    link: function($scope, $element, $attrs) {
      if(!$scope.schema) {
        throw Error('No schema provided');
      }

      $scope.form = $scope.form || {};
    }
  };

});