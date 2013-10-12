angular.module('febworms').directive('febwormsCanvas',function (febwormsUtils) {

  return {
    templateUrl: 'febworms/edit/canvas/febworms-canvas.tmpl.html',
    controller: 'febwormsCanvasController',
    link: function (scope, $element, attrs) {

      var $ = angular.element;

      var $canvas = $(_.find($element[0].children, { className: 'febworms-canvas' }));
      var dragover = false;

      $canvas.on('dragenter', function (e) {
        if (!dragover) {
          console.log('dragenter');
          dragover = true;
          scope.$apply(scope.addDragProxy);
        }
      });

      $canvas.on('dragover', function (e) {
        e.dataTransfer.dropEffect = "copyMove";
        return febwormsUtils.stopEvent(e);
      });

      $canvas.on('drop', function (e) {

        if (dragover) {
          var json = e.dataTransfer.getData('text');
          console.log('data transfer data', json);
          var dragData = angular.fromJson(json);

          scope.$apply(function () {
            scope.handleDrop(dragData);
          });

          dragover = false;
        }

        return febwormsUtils.stopEvent(e);
      });

      $canvas.on('dragleave', function (e) {

        if (dragover) {
          var pos = febwormsUtils.getCursorPosition(e);
          var rect = this.getBoundingClientRect();
          if (!febwormsUtils.containsPoint(rect, pos)) {
            console.log('dragleave');
            dragover = false;
            scope.$apply(scope.clearAllDragProxies);
          }
        }
      });
    }
  };
}).controller('febwormsCanvasController',function ($scope) {

    $scope.clearAllDragProxies = function () {
      console.log('clear');
      _.remove($scope.schema.fields, { type: 'dragproxy'});
    };

    $scope.addDragProxy = function () {
      console.log('add');
      if (_.first($scope.schema.fields, { type: 'dragproxy' }).length === 0) {
        $scope.schema.fields.push(new febworms.Field('dragproxy'));
      }
    };

    $scope.handleDrop = function (dropData) {
      console.log('drop');

      var field = dropData.field;

      if (dropData.source === 'palette') {
        field = $scope.copyPaletteField(field);
      }

      var idx = _.findIndex($scope.schema.fields, { type: 'dragproxy' });
      $scope.schema.fields[idx] = field;
    };

  }).directive('febwormsCanvasField',function () {
    return {
      templateUrl: 'febworms/edit/canvas/febworms-canvas-field.tmpl.html',
      replace: true
    };
  }).directive('febwormsCanvasFieldValidation',function () {
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