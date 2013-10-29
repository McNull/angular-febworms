angular.module('febworms').directive('febwormsEdit', function() {
  return {
    restrict: 'AE',
    scope: {
      schema: '=?'
    },
    replace: true,
    controller: 'febwormsEditController',
    templateUrl: 'febworms/edit/febworms-edit.tmpl.html',
    link: function($scope, $element, $attrs) { }
  }
});