angular.module('febworms').directive('febwormsForm', function() {
  return {
    restrict: 'AE',
    require: ['^?form', 'febwormsForm'],
    controller: 'febwormsFormController',
    scope: {
      formData: '=?febwormsFormData', // The form data
      schema: '=?febwormsSchema'
    },
    link: function($scope, $element, $attrs, ctrls) {

      var ngFormCtrl = ctrls[0];
      var febwormsFormCtrl = ctrls[1];

      $scope.$watchCollection('[form, formData, schema]', function(values) {
        if (values) {
          $scope.form = febwormsFormCtrl.updateFormModel(ngFormCtrl);
        }
      });

      $scope.form = febwormsFormCtrl.updateFormModel(ngFormCtrl);
    }
  };
});
