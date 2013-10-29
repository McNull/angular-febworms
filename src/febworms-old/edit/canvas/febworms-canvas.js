angular.module('febworms').directive('febwormsCanvas',function () {

  return {
    templateUrl: 'febworms/edit/old/canvas/febworms-canvas.tmpl.html',
    controller: 'febwormsCanvasController'
  };
}).controller('febwormsCanvasController',function ($scope, dqUtils, $timeout) {

    $scope.dragPlaceholder = {
      visible: false,
      index: 0
    };

    $scope.dragEnter = function () {
      $scope.dragPlaceholder.visible = true;
      $scope.dragPlaceholder.index = $scope.schema.fields.length;
    };

    $scope.dragLeave = function () {
      $scope.dragPlaceholder.visible = false;
    };

    $scope.dragBeginCanvasField = function (index, field) {

      // Delay is set to prevent browser from copying adjusted html as copy image

      $timeout(function () {
        field.$_isDragging = true;
      }, 1);

      return { source: 'canvas', field: field, index: index };
    };

    $scope.dragEndCanvasField = function (field) {

      // IE Fix: ensure this is fired after the drag begin

      $timeout(function () {
        field.$_isDragging = false;
      }, 10);
    };

    $scope.drop = function () {

      var dragData = dqUtils.dragData();

      if (dragData && dragData.data) {

        var field = dragData.data.field;
        var source = dragData.data.source;
        var index = dragData.data.index;
        var fields = $scope.schema.fields;

        if (source == 'palette') {
          field = $scope.copyPaletteField(field);
          fields.splice($scope.dragPlaceholder.index, 0, field);
        } else if (source == 'canvas') {
          fields.splice(index, 1);
          fields.splice($scope.dragPlaceholder.index, 0, field);
        }

        // IE fix: not calling dragEnd sometimes
        field.$_isDragging = false;
      } else {
        console.log('Drop without data');
        debugger;
      }
    };

  }).directive('febwormsCanvasField',function () {
    return {
      templateUrl: 'febworms/edit/old/canvas/febworms-canvas-field.tmpl.html',
      replace: true
    };
  });