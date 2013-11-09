angular.module('febworms').directive('febwormsField', function(febwormsUtils) {

  return {
    require: ['^?febwormsForm', 'febwormsField'],
    replace: true,
    templateUrl: 'febworms/render/field.tmpl.html',
    scope: {
      fieldSchema: '=febwormsField', // The schema definition of the field
      tabIndex: '=?febwormsTabIndex', // Optional tab index -- used in overlay mode to disable focus
      editMode: '=?febwormsEditMode', // Indicates edit mode, which will sync the fieldSchema.value 
      // to the form data for WYSIWYG pleasures.
      noValidationSummary: '=febwormsNoValidationSummary' // If true hides the validation summary
    },
    controller: 'febwormsFieldController',
    link: function($scope, $element, $attrs, ctrls) {

      var febwormsFormCtrl = ctrls[0];
      var febwormsFieldController = ctrls[1];

      if ($scope.tabIndex === undefined) {
        $scope.tabIndex = 'auto';
      }

      $scope.renderInfo = febwormsUtils.getRenderInfo($scope.fieldSchema);

      febwormsFieldController.init(febwormsFormCtrl, $scope.fieldSchema, $scope.editMode);
    }
  };

});