angular.module('febworms', ['templates-febworms']).filter('j$on', function () {
    return function (input) {
      return JSON.stringify(input || {}, null, '  ');
    };
  });

