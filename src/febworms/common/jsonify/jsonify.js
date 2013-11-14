angular.module('febworms').filter('j$on',function () {
  return function (input) {
    return JSON.stringify(input || {}, null, '  ');
  };
}).directive('jsonify', function () {
    return {
      templateUrl: 'febworms/common/jsonify/jsonify.tmpl.html',
      replace: true,
      scope: {
        jsonify: "="
      }
    };
  });
