angular.module('febworms').directive('febwormsForm', function(febwormsFormCompileFn) {
  return {
    restrict: 'AE',
    require: ['^?form', 'febwormsForm', '^febwormsSchema'],
    controller: 'febwormsFormController',
    scope: {
      formData: '=?febwormsFormData',
    },
    compile: febwormsFormCompileFn
  };
}).factory('febwormsFormLinkFn', function($compile) {
    return function link($scope, $element, $attrs, ctrls) {

      // For some reason angular does not provide the "correct" scope in this situation,
      // so I grab it from the element itself.
      // This wasn't needed before the final of angular 1.2.

      $scope = $element.scope();

      var ngFormCtrl = ctrls[0];

      var formCtrl = ctrls[1];
      var schemaCtrl = ctrls[2];

      // Maybe this is needed back in
      
      // $scope.$watch(function() {
      //   $scope.form = formCtrl.updateFormModel($scope.formData, schemaCtrl.model(), ngFormCtrl);
      // });

      $scope.form = formCtrl.updateFormModel($scope.formData, schemaCtrl.model(), ngFormCtrl);      
    };
}).factory('febwormsFormCompileFn', function(febwormsFormLinkFn) {
  return function($element, $attrs) {

    var noRender = $attrs.febwormsNoRender;
    // var noRender = $element.attr('febworms-no-render');

    if (noRender !== 'true') {
      var renderTemplate = '<div febworms-form-fields></div>';
      $element.append(renderTemplate);
    }
    
    return febwormsFormLinkFn;
  };
});

