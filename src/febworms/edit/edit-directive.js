angular.module('febworms').directive('febwormsEdit', function() {
  return {
    restrict: 'AE',
    scope: {
      // The schema model to edit
      schema: '=?',
      // Boolean indicating wether to show the default form action buttons
      actionsEnabled: '=?',
      // Callback function when the user presses save -- any argument named 'schema' is set to the schema model.
      onSave: '&',
      // Callback function when the user presses cancel -- any argument named 'schema' is set to the schema model.
      onCancel: '&',
      // Boolean indicating wether the edit is in preview mode or not
      preview: '=?'
    },
    replace: true,
    controller: 'febwormsEditController as editCtrl',
    templateUrl: 'febworms/edit/edit.tmpl.html',
    link: function($scope) {

      $scope.schema = $scope.schema || {};
      $scope.schema.fields = $scope.schema.fields || [];

      if($scope.actionsEnabled === undefined) {
        $scope.actionsEnabled = true;
      }

      if($scope.preview === undefined) {
        $scope.preview = false;
      }
    }
  }
});