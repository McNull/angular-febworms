angular.module('febworms')
  .directive('febwormsEdit', function() {
    return {
      restrict: 'AEC',
      controller: 'febwormsEditController',
      templateUrl: 'febworms/edit/old/febworms-edit.tmpl.html',
      replace: true,
      scope: { schema: "=" }
    };
  });
