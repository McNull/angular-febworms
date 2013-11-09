angular.module('febworms').directive('febwormsFieldInput', function(febwormsFieldInputLinkFn) {
  return {
    require: ['^febwormsField', 'ngModel'],
    link: febwormsFieldInputLinkFn
  };
}).factory('febwormsFieldInputLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    var febwormsFieldCtrl = ctrls[0];
    var ngModelCtrl = ctrls[1];

    febwormsFieldCtrl.setFieldState(ngModelCtrl);
  };
});