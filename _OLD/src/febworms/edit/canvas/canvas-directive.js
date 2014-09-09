angular.module('febworms').directive('febwormsEditCanvas', function() {

  return {
    require: ['^febwormsEdit', '^febwormsSchema'],
    templateUrl: 'febworms/edit/canvas/canvas.tmpl.html',
    controller: 'febwormsEditCanvasController as canvasCtrl',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.editCtrl = ctrls[0];
      $scope.schemaCtrl = ctrls[1];

      // $scope.formModel = {}; // Dummy formModel for WYSIWYG pleasures
    }
  };
});
