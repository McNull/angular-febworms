angular.module('febworms')
  .directive('febEdit', function() {
    return {
      restrict: 'AEC',
      controller: 'febEditController',
      templateUrl: 'febworms/edit/feb-edit.tmpl.html',
      replace: true,
      scope: { schema: "=" }
    };
  });
