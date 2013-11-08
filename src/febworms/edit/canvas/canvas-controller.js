angular.module('febworms').controller('febwormsEditCanvasController', function ($scope, dqUtils, $timeout, febwormsUtils) {

  $scope.dragPlaceholder = {
    visible: false,
    index: 0
  };

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -
  // Drag & drop
  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -

  this.dragEnter = function () {
    $scope.dragPlaceholder.visible = true;
    $scope.dragPlaceholder.index = $scope.schema.fields.length;
  };

  this.dragLeave = function () {
    $scope.dragPlaceholder.visible = false;
  };

  this.dragBeginCanvasField = function (index, field) {

    // Delay is set to prevent browser from copying adjusted html as copy image

    $timeout(function () {
      field.$_isDragging = true;
    }, 1);

    return { source: 'canvas', field: field, index: index };
  };

  this.dragEndCanvasField = function (field) {

    // IE Fix: ensure this is fired after the drag begin

    $timeout(function () {
      field.$_isDragging = false;
    }, 10);
  };

  this.drop = function () {

    var dragData = dqUtils.dragData();

    if (dragData && dragData.data) {

      var field = dragData.data.field;
      var source = dragData.data.source;
      var index = dragData.data.index;
      var fields = $scope.schema.fields;

      if (source == 'palette') {
        $scope.schemaCtrl.addField(field, $scope.dragPlaceholder.index);
      } else if (source == 'canvas') {
        $scope.schemaCtrl.moveField(index, $scope.dragPlaceholder.index);
        // fields.splice(index, 1);
        // fields.splice($scope.dragPlaceholder.index, 0, field);
      }

      // IE fix: not calling dragEnd sometimes
      field.$_isDragging = false;
    } else {
      throw Error('Drop without data');
    }
  };

});