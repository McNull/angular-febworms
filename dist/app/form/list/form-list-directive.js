
angular.module('myApp').directive('formList', function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'app/form/list/form-list.tmpl.html',
    controller: 'FormListController'
  };
});
