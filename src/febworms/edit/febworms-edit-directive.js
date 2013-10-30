angular.module('febworms').directive('febwormsEdit', function() {
  return {
    restrict: 'AE',
    scope: {
      schema: '=?',
      previewEnabled: '=?',
      onSave: '&',
      onCancel: '&'
    },
    replace: true,
    controller: 'febwormsEditController',
    templateUrl: 'febworms/edit/febworms-edit.tmpl.html',
    link: function($scope, $element, $attrs) {

      $scope.onSave.set = $attrs.onSave !== undefined;
      $scope.onCancel.set = $attrs.onCancel !== undefined;

    }
  }
});