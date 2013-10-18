angular.module('febworms').directive('febwormsCanvas',function (febwormsUtils) {

  return {
    templateUrl: 'febworms/edit/canvas/febworms-canvas.tmpl.html',
    controller: 'febwormsCanvasController'
  };
}).controller('febwormsCanvasController',function ($scope, dqUtils) {

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

    $scope.drop = function () {

      console.log('expression');

      var dragData = dqUtils.dragData();

      console.log(angular.toJson(dragData, true));

      if(dragData && dragData.data) {

        var field = dragData.data.field;
        var source = dragData.data.source;

        if(source == 'palette') {
          field = $scope.copyPaletteField(field);

          $scope.schema.fields.splice($scope.dragPlaceholder.index, 0, field);
        }
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