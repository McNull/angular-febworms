angular.module('febworms').directive('febwormsForm', function() {
  return {
    restrict: 'AE',
    require: ['^?form', 'febwormsForm', '^febwormsSchema'],
    controller: 'febwormsFormController',
    scope: {
      formData: '=?febwormsFormData', // The form data
    },
    compile: function($element, $attrs) {

      if($attrs.febwormsNoRender === undefined) {
        var renderTemplate = '<div febworms-render></div>';
        $element.append(renderTemplate);
      }

      return function link($scope, $element, $attrs, ctrls) {

        var ngFormCtrl = ctrls[0];
        var formCtrl = ctrls[1];
        var schemaCtrl = ctrls[2];

        $scope.$watch(function() {
          return schemaCtrl.model();
        }, function(value) {
          $scope.schema = value;
        });

        $scope.$watchCollection('[form, formData, schema]', function(values) {
          if (values) {
            $scope.form = formCtrl.updateFormModel(ngFormCtrl);
          }
        });

        $scope.form = formCtrl.updateFormModel(ngFormCtrl);
      };
    }
    
  };
});
