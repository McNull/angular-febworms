angular.module('febworms').directive('febwormsEditMeta', function() {
  return {
    // By requiring the schema controller we ensure that the schema is on the scope
    require: ['^febwormsEdit', '^febwormsSchema'],
    restrict: 'AE',
    templateUrl: 'angular-febworms/edit/meta/meta.ng.html',
    link: function($scope, $element, $attrs, ctrls) {

      var editCtrl = ctrls[0];

      var formController = $element.find('form').controller('form');
      editCtrl.setMetaForm(formController);
      
    }
  };
});