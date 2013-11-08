angular.module('febworms').directive('febwormsEditMeta', function() {
  return {
    // By requiring the schema controller we ensure that the schema is on the scope
    require: ['^febwormsEdit', '^febwormsSchema'],
    restrict: 'AE',
    templateUrl: 'febworms/edit/meta/meta.tmpl.html',
    link: function($scope, $element, $attrs, ctrls) {

      editCtrl = ctrls[0];

      var formController = $element.find('form').controller('form');
      editCtrl.setMetaForm(formController);
      
    }
  };
});
