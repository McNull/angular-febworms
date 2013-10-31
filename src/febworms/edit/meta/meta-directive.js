angular.module('febworms').directive('febwormsEditMeta', function() {
  return {
    restrict: 'AE',
    scope: {
      schema: '=?',
      exposeForm: '&'
    },
    templateUrl: 'febworms/edit/meta/meta.tmpl.html'
  };
});
