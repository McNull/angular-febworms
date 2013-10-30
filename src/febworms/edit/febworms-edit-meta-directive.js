angular.module('febworms').directive('febwormsEditMeta', function() {
  return {
    restrict: 'AE',
    scope: {
      schema: '=?',
      exposeForm: '&'
    },
    templateUrl: 'febworms/edit/febworms-edit-meta.tmpl.html'
  };
});
