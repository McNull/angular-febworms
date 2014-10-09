app.controller('FormListCtrl', function ($scope, forms, $location, $window, inform) {

  $scope.forms = forms;

  $scope.newForm = function () {
    $location.path('/forms/edit/');
  };

  $scope.editForm = function (form) {
    $location.path('/forms/edit/' + form.id);
  };

  $scope.removeForm = function (form) {
    if ($window.confirm('Are you sure you want to delete the form?')) {
      var idx = app.utils.indexOf(forms, form);
      forms.splice(idx, 1);

      inform.add('Form has been deleted', { type: 'success' });
    }
  };

  $scope.displayDataEntries = function (form) {
    $location.path('/forms/data/' + form.id);
  };

});

