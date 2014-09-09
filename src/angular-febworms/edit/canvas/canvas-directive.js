angular.module('febworms').directive('febwormsEditCanvas', function() {

  return {
    require: ['^febwormsEdit', '^febwormsSchema'],
    templateUrl: 'angular-febworms/edit/canvas/canvas.ng.html',
    controller: 'febwormsEditCanvasController as canvasCtrl',
    link: function($scope, $element, $attrs, ctrls) {
      $scope.editCtrl = ctrls[0];
      $scope.schemaCtrl = ctrls[1];

      // $scope.formModel = {}; // Dummy formModel for WYSIWYG pleasures
    }
  };
});
