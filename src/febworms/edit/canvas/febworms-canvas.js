angular.module('febworms').directive('febwormsCanvas', function() {
  return {
    templateUrl: 'febworms/edit/canvas/febworms-canvas.tmpl.html',
    restrict: 'A',
    controller: 'febwormsCanvasController'
  };
}).controller('febwormsCanvasController', function($scope) {

  });