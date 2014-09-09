angular.module('febworms').directive('febwormsDropdownInput', function($compile, $document, $timeout, $parse, febwormsUtils) {

  function createInput($scope, $element, $attrs) {

    var template = '<div class="febworms-dropdown-input input-append">' +
      '<input type="text"/>' +
      '<div class="btn-group">' +
      '<a href="" class="btn dropdown-toggle" ng-click="dropdownToggle()">' +
      '<span class="caret"></span>' +
      '</a>' +
      '</div>' +
      '</div>';

    var $template = angular.element(template);
    var $input = $template.find('input');

    // Copy the original attributes to the input element

    var attributes = $element.prop("attributes");

    angular.forEach(attributes, function(a) {
      if (a.name !== 'febworms-dropdown-input' && a.name !== 'class') {
        $input.attr(a.name, a.value);
      }
    });

    var $button = $template.find('a');
    var closeTimeout;

    $scope.dropdownToggle = function() {
      $button[0].focus(); // force focus for chrome  
      $scope.dropdownVisible = !$scope.dropdownVisible
    };

    $button.on('blur', function() {
      closeTimeout = $timeout(function() {
        $scope.dropdownVisible = false;
      }, 100);
    });

    $scope.$on('$destroy', function() {
      if (closeTimeout) $timeout.cancel(closeTimeout);
      closeTimeout = undefined;
    });

    return $template;
  }

  function createDropdown($scope, $element, $attrs, ngModelCtrl, $input) {

    var modelGetter = $parse($attrs.ngModel);
    var modelSetter = modelGetter.assign;

    var template = '<div class="febworms-dropdown" ng-class="{ \'open\': dropdownVisible }">' +
      '<ul ng-if="items && items.length" class="dropdown-menu">' +
      '<li ng-repeat="item in items" ng-class="{ active: item.value === getModelValue() }">' +
      '<a href="" ng-click="setModelValue(item.value)">{{ item.text || item.value }}</a>' +
      '</li>' +
      '</ul>' +
      '</div>';

    var $template = angular.element(template);

    $scope.setModelValue = function(value) {

      $scope.dropdownVisible = false;

      // Convert to a string

      var viewValue = value || '';

      var idx = ngModelCtrl.$formatters.length;

      while (idx--) {
        var fn = ngModelCtrl.$formatters[idx];
        var viewValue = fn(viewValue);

        if (viewValue === undefined) {
          break;
        }
      };

      // Parse the viewValue

      idx = ngModelCtrl.$parsers.length;
      var pv = viewValue;

      while (idx--) {
        var fn = ngModelCtrl.$parsers[idx];
        pv = fn(pv);

        if (pv === undefined) {
          break;
        }
      }

      if (pv === undefined) {
        // Failed to parse.
        // Set the formatted string in the input, which will retrigger the parsing and display the correct error message.

        ngModelCtrl.$setViewValue(viewValue);
        ngModelCtrl.$render();

      } else {
        modelSetter($scope, value);
      }
    };

    $scope.getModelValue = function() {
      return modelGetter($scope);
    };

    var input = $input[0];

    $scope.$watch('dropdownVisible', function(value) {
      if (value) {

        var rect = input.getBoundingClientRect();
        var scroll = febwormsUtils.getScrollOffset();

        $template.css({
          left: (scroll.x + rect.left) + 'px',
          top: (scroll.y + rect.top + input.clientHeight) + 'px',
          width: input.clientWidth + 'px'
        });
      }
    });

    $scope.$watchCollection($attrs.febwormsDropdownInput, function(value) {
      $scope.items = value;
    });

    $scope.$on('$destroy', function() {
      $template.remove();
    });

    return $template;
  }

  return {
    priority: 1000,
    restrict: 'A',
    terminal: true,
    scope: true,
    compile: function(tElement, tAttrs) {

      return function link($scope, $element, $attrs, ctrls) {

        var $input = createInput($scope, $element, $attrs);

        $element.append($input);
        $compile($input)($scope);

        var $inputText = $input.find('input');
        var ngModelCtrl = $inputText.controller('ngModel');

        ////////////////////////////////////////

        var $dropdown = createDropdown($scope, $element, $attrs, ngModelCtrl, $input);
        var dropdownCompileFn = $compile($dropdown);

        var $body = $document.find('body');

        $body.append($dropdown);

        dropdownCompileFn($scope);

        ////////////////////////////////////////
      };
    }
  };
});
