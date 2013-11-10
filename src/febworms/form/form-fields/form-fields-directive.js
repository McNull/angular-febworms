angular.module('febworms').directive('febwormsFormFields', function() {

  return {
    require: ['^febwormsForm'],
    restrict: 'AE',
    templateUrl: 'febworms/form/form-fields/form-fields.tmpl.html',
    link: function($scope, $element, $attrs, ctrls) {}
  };

});