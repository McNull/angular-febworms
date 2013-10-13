angular.module('febworms').directive('febwormsCanvas',function (febwormsUtils) {

  return {
    templateUrl: 'febworms/edit/canvas/febworms-canvas.tmpl.html',
    controller: 'febwormsCanvasController',
    link: function (scope, $element, attrs) {

      var $ = angular.element;

      var canvas = febwormsUtils.findElementsByClass($element[0], 'febworms-canvas', true)[0];
      var $canvas = $(canvas);

      var dragover = false;
      var pos = {};

      $canvas.on('dragenter', function (e) {
        if (!dragover) {
          dragover = true;
          scope.$apply(scope.addDragProxy);
        }
      });

      $canvas.on('mousemove', function(e) {
        // IE made me do this.
        pos = febwormsUtils.getCursorPosition(e);
        pos.x -= canvas.offsetLeft;
        pos.y -= canvas.offsetTop;
      });

      $canvas.on('dragover', function (e) {

        e.dataTransfer.dropEffect = "copyMove";
        return febwormsUtils.stopEvent(e);
      });

      $canvas.on('drop', function (e) {

        if (dragover) {
          var json = e.dataTransfer.getData('text');
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
          // This doesn't work for IE (including 10+)
          // IE thinks it's cool to provide old event data.
          // GOD, I HATE THAT BROWSER!!!!
          // var pos = febwormsUtils.getCursorPosition(e);

          // var canvas = $canvas[0];

          // pos.x -= canvas.offsetLeft;
          // pos.y -= canvas.offsetTop;

          // pos is now updated via mouse move event
          if (pos.x < 0 || pos.x >= canvas.offsetWidth || pos.y < 0 || pos.y >= canvas.offsetHeight) {

            var json = angular.toJson({ stamp: Date.now(), pos: pos, offsetWidth: canvas.offsetWidth, offsetHeight: canvas.offsetHeight }, true);

            console.log(json);

            scope.$apply(scope.clearAllDragProxies);
            dragover = false;
          }
        }
      });
    }
  };
}).controller('febwormsCanvasController',function ($scope) {

    $scope.clearAllDragProxies = function () {
      _.remove($scope.schema.fields, { type: 'dragproxy'});
    };

    $scope.addDragProxy = function () {
      if (_.first($scope.schema.fields, { type: 'dragproxy' }).length === 0) {
        $scope.schema.fields.push(new febworms.Field('dragproxy'));
      }
    };

    $scope.handleDrop = function (dropData) {
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