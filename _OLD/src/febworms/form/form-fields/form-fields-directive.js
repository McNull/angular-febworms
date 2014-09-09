angular.module('febworms').directive('febwormsFormFields', function() {

  return {
    require: ['^febwormsForm'],
    restrict: 'AE',
    templateUrl: 'febworms/form/form-fields/form-fields.tmpl.html',
    scope: {},
    link: function($scope, $element, $attrs, ctrls) {

      var febwormsForm = ctrls[0];

      $scope.$watch(function() {
        return febwormsForm.model;
      }, function(value) {
        $scope.form = value;
      });
    }
  };

});