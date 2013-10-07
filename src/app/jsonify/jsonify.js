angular.module('myApp').directive('jsonify', function() {
  return {
    templateUrl: 'app/jsonify/jsonify.tmpl.html',
    restrict: 'A',
    replace: true,
    scope: {
      jsonify: "="
    },
    link: function postLink(scope, iElement, iAttrs) {

    }
  };
});
