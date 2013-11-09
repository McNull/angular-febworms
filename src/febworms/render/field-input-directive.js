angular.module('febworms').directive('febwormsFieldInput', function(febwormsUtils) {

  return {
    require: ['^febwormsField', 'ngModel'],
    link: function($scope, $element, $attrs, ctrls) {

      var febwormsFieldCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      
      febwormsFieldCtrl.setFieldState(ngModelCtrl);
    }
  };
});