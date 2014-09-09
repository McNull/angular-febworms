angular.module('febworms').directive('febwormsForm', function(febwormsFormCompileFn) {
  return {
    restrict: 'AE',
    require: ['^?form', 'febwormsForm', '^febwormsSchema'],
    controller: 'febwormsFormController',
    scope: true,
    compile: febwormsFormCompileFn
  };
}).factory('febwormsFormLinkFn', function() {
    return function link($scope, $element, $attrs, ctrls) {

      var ngFormCtrl = ctrls[0];
      var formCtrl = ctrls[1];
      var schemaCtrl = ctrls[2];

      var editMode = $attrs.febwormsNoRender === 'true';

      formCtrl.init($attrs.febwormsFormData, schemaCtrl, ngFormCtrl, editMode);
      
    };
}).factory('febwormsFormCompileFn', function(febwormsFormLinkFn) {
  return function($element, $attrs) {

    var noRender = $attrs.febwormsNoRender;
    
    if (noRender !== 'true') {
      var renderTemplate = '<div febworms-form-fields></div>';
      $element.append(renderTemplate);
    }
    
    return febwormsFormLinkFn;
  };
});

