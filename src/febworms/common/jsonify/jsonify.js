angular.module('febworms').filter('j$on',function () {
  return function (input, displayHidden) {

    if(displayHidden)
      return JSON.stringify(input || {}, null, '  ');

    return angular.toJson(input || {}, true);
  };
}).directive('jsonify', function ($window, $filter) {
    return {
      templateUrl: 'febworms/common/jsonify/jsonify.tmpl.html',
      replace: true,
      scope: {
        jsonify: "=",
        displayHidden: "@jsonifyDisplayHidden"
      },
      link: function($scope, $element, $attrs, ctrls) {
        $scope.expression = $attrs.jsonify;

        $scope.copy = function() {
          $window.prompt ("Copy to clipboard: Ctrl+C, Enter", $filter('j$on')($scope.jsonify, $scope.displayHidden));
        };
      }
    };
  });
