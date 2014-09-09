angular.module('febworms').directive('febwormsEdit', function() {
  return {
    priority: 100,
    require: 'febwormsSchema',
    restrict: 'AE',
    scope: {
      // // The schema model to edit
      schema: '=?febwormsSchema',
      // Boolean indicating wether to show the default form action buttons
      actionsEnabled: '=?febwormsActionsEnabled',
      // Callback function when the user presses save -- any argument named 'schema' is set to the schema model.
      onSave: '&febwormsOnSave',
      // Callback function when the user presses cancel -- any argument named 'schema' is set to the schema model.
      onCancel: '&febwormsOnCancel',
      // Boolean indicating wether the edit is in preview mode or not
      preview: '=?febwormsPreview'
    },
    replace: true, 
    controller: 'febwormsEditController as editCtrl',
    templateUrl: 'angular-febworms/edit/edit.ng.html',
    link: function($scope, $element, $attrs, schemaCtrl) {
      
      if($scope.schema === undefined) {
        $scope.schema = {};
      }

      if($scope.actionsEnabled === undefined) {
        $scope.actionsEnabled = true;
      }

      if($scope.preview === undefined) {
        $scope.preview = false;
      }

      schemaCtrl.model($scope.schema);
      $scope.schemaCtrl = schemaCtrl;
    }
  }
});