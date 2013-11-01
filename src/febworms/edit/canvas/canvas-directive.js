angular.module('febworms').directive('febwormsEditCanvas', function() {

  return {
    require: '^febwormsEdit',
    templateUrl: 'febworms/edit/canvas/canvas.tmpl.html',
    controller: 'febwormsEditCanvasController as canvasCtrl',
    scope: {
      schema: "="
    },
    link: function($scope, $element, $attrs, febwormsEditController) {
      $scope.editCtrl = febwormsEditController;
    }
  };
});
