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
}).factory('febwormsFormLinkFn', function() {
    return function link($scope, $element, $attrs, ctrls) {

      var ngFormCtrl = ctrls[0];
      var formCtrl = ctrls[1];
      var schemaCtrl = ctrls[2];

      $scope.$watch(function() {
        return schemaCtrl.model();
      }, function(value) {
        $scope.schema = value;
      });

      $scope.$watchCollection('[form, formData, schema]', function(values) {
        if (values) {
          $scope.form = formCtrl.updateFormModel(ngFormCtrl);
        }
      });

      $scope.form = formCtrl.updateFormModel(ngFormCtrl);
    };
}).factory('febwormsFormCompileFn', function(febwormsFormLinkFn) {
  return function($element, $attrs) {

    if ($attrs.febwormsNoRender === undefined) {
      var renderTemplate = '<div febworms-form-fields></div>';
      $element.append(renderTemplate);
    }

    return febwormsFormLinkFn;
  };
});