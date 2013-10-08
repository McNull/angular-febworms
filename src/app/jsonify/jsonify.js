angular.module('myApp').filter('j$on',function () {
  return function (input) {
    return JSON.stringify(input || {}, null, '  ');
  };
}).directive('jsonify', function () {
    return {
      templateUrl: 'app/jsonify/jsonify.tmpl.html',
      restrict: 'A',
      replace: true,
      scope: {
        jsonify: "="
      }
    };
  });
