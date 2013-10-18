angular.module('angularDrag', []).factory('dragUtils',function ($window) {
  return {
    getEvent: function (e) {
      return e && e.originalEvent ? e.originalEvent : e || $window.event;
    },
    stopEvent: function (e) {
      // e.cancelBubble is supported by IE8 -
      // this will kill the bubbling process.
      e.cancelBubble = true;

      // e.stopPropagation works in modern browsers
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();

      return false;
    }
  };
}).directive('dragItem',function (dragUtils, $timeout) {

    return {
      link: function ($scope, $element, $attrs) {
        $element.attr('draggable', 'true').on('dragstart',function (e) {

          e = dragUtils.getEvent(e);

          $scope.$apply(function () {
            var data = $scope.$eval($attrs.dragBegin);

            if (data) {
              if (angular.isObject(data)) {
                data = angular.toJson(data);
              }

              var dt = e.dataTransfer;
              dt.effectAllowed = 'all';
              dt.setData('Text', data);
            }
          });

          $timeout(function() {
            $element.addClass('dragging');
          },1);

        }).on('selectstart',function (e) {

            // Pure IE evilness

            if(this.dragDrop) {
              this.dragDrop();
              e = dragUtils.getEvent(e);
              return dragUtils.stopEvent(e);
            }

          }).on('dragend', function (e) {
            $element.removeClass('dragging');
            $scope.$apply(function () {
              $scope.$eval($attrs.dragEnd);
            });
          });
      }
    }
  }).directive('dragDropArea', function (dragUtils) {

    function evalExpression($scope, expression, dataTransfer, toObject) {
      var eval = $scope.$eval(expression);

      if (angular.isFunction(eval)) {
        var dropData = dataTransfer.getData('Text');
        if (toObject) {
          dropData = angular.fromJson(dropData)
        }
        eval = eval(dropData);
      }

      return eval;
    }

    return {
      link: function ($scope, $element, $attrs) {
        $element.on('drop',function (e) {
          e = dragUtils.getEvent(e);

          $scope.$apply(function () {
            evalExpression($scope, $attrs.dropItem, e.dataTransfer, true);
            evalExpression($scope, $attrs.dropItemText, e.dataTransfer, false);
          });

          return dragUtils.stopEvent(e);
        }).on('dragover',function (e) {

            e = dragUtils.getEvent(e);

            $scope.$apply(function () {

              if(evalExpression($scope, $attrs.dragOver, e.dataTransfer, true) === false ||
                evalExpression($scope, $attrs.dragOverText, e.dataTransfer, false) === false) {
                e.dataTransfer.dropEffect = "none";
              } else {
                e.dataTransfer.dropEffect = "copy";
                $element.addClass('dragover');
              }
            });

            return dragUtils.stopEvent(e);
          }).on('dragenter',function (e) {

            $scope.$apply(function () {
              evalExpression($scope, $attrs.dragEnter, e.dataTransfer, true);
              evalExpression($scope, $attrs.dragEnterText, e.dataTransfer, false);
            });

            e = dragUtils.getEvent(e);
            return dragUtils.stopEvent(e);
          }).on('dragleave', function (e) {
            $element.removeClass('dragover');
            $scope.$apply(function () {
              evalExpression($scope, $attrs.dragLeave, e.dataTransfer, true);
              evalExpression($scope, $attrs.dragLeaveText, e.dataTransfer, false);
            });
          });
      }
    };
  });