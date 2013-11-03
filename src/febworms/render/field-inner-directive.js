angular.module('febworms').directive('febwormsRenderFieldInner', function(febwormsUtils) {

  return {
    require: '^?form',          // 'form' is the ng-form controller
    replace: true,
    templateUrl: 'febworms/render/field-inner.tmpl.html',
    scope: {
      fieldSchema: '=',         // The schema definition of the field
      form: '=formModel',       // The form model
      tabIndex: '=?',           // Optional tab index -- used in overlay mode to disable focus
      editMode: '=',            // Indicates edit mode, which will sync the fieldSchema.value 
                                // to the formModel for WYSIWYG pleasures.
      noValidationSummary: '='  // If true hides the validation summary
    },
    link: function($scope, $element, $attrs, $formController) {

      if($scope.tabIndex === undefined) {
        $scope.tabIndex = 'auto';
      }

      if($scope.editMode) {
        $scope.$watch('fieldSchema.value', function(value) {
          $scope.form[$scope.fieldSchema.name] = value;
        });
      } else if($scope.form && $scope.form[$scope.fieldSchema.name] === undefined) {
        $scope.form[$scope.fieldSchema.name] = $scope.fieldSchema.value;
      }

      $scope.renderInfo = febwormsUtils.getRenderInfo($scope.fieldSchema);
    }
  };

});
