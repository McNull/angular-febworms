angular.module('febworms').directive('febwormsEditCanvas', function() {

  return {
    require: ['^febwormsEdit', '^febwormsSchema', '^form'],
    templateUrl: 'angular-febworms/edit/canvas/canvas.ng.html',
    controller: 'febwormsEditCanvasController as canvasCtrl',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.editCtrl = ctrls[0];
      $scope.schemaCtrl = ctrls[1];
      $scope.formCtrl = ctrls[2];

      var ignoreDirty = true;

      $scope.$watchCollection('schema.fields', function() {

        // Ignore the first call, $watchCollection fires at once without any changes.

        if(!ignoreDirty) {
          $scope.formCtrl.$setDirty(true);
        }

        ignoreDirty = false;

      });
    }
  };
});
