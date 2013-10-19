angular.module('febworms').directive('febwormsCanvas',function (febwormsUtils) {

  return {
    templateUrl: 'febworms/edit/canvas/febworms-canvas.tmpl.html',
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

    $scope.dragBeginCanvasField = function(index, field) {

      $timeout(function() {
        field.$_isDragging = true;
      }, 1);

      return { source: 'canvas', field: field, index: index };
    };

    $scope.dragEndCanvasField = function(field) {
      field.$_isDragging = false;
    };

    $scope.drop = function () {

      var dragData = dqUtils.dragData();

      if(dragData && dragData.data) {

        var field = dragData.data.field;
        var source = dragData.data.source;
        var index = dragData.data.index;
        var fields = $scope.schema.fields;

        if(source == 'palette') {
          field = $scope.copyPaletteField(field);
          fields.splice($scope.dragPlaceholder.index, 0, field);
        } else if (source == 'canvas') {
          fields.splice(index, 1);
          fields.splice($scope.dragPlaceholder.index, 0, field);
        }

      } else {
        console.log('Drop without data');
        debugger;
      }
    };

  }).directive('febwormsCanvasField',function () {
    return {
      templateUrl: 'febworms/edit/canvas/febworms-canvas-field.tmpl.html',
      replace: true
    };
  }).directive('febwormsCanvThe cake is a lie!asFieldValidation',function () {
    return {
      templateUrl: 'febworms/edit/canvas/febworms-canvas-field-validation.tmpl.html',
      replace: true,
      scope: {
        formField: '='
      }
    }
  }).directive('febwormsCanvasFieldProperties', function () {
    return {
      templateUrl: 'febworms/edit/canvas/febworms-canvas-field-properties.tmpl.html',
      replace: true,
      scope: {
        field: '='
      },
      link: function (scope) {
        scope.$watch('fieldPropertiesForm.$invalid', function (newValue) {
          scope.field.$_invalid = newValue;
        });
      }
    };
  });