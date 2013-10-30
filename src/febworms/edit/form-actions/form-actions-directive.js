angular.module('febworms').directive('febwormsEditFormActions', function() {

  return {
    require: '^febwormsEdit',
    templateUrl: 'febworms/edit/form-actions/form-actions.tmpl.html',
    link: function($scope, $element, $attrs, febwormsEditController) {

    }
  };
});