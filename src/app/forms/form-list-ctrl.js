app.controller('FormListCtrl', function ($scope, Form, forms, $location, $window, inform) {

  $scope.forms = forms;

  $scope.newForm = function () {
    $location.path('/forms/edit/');
  };

  $scope.editForm = function (form) {
    $location.path('/forms/edit/' + form.id);
  };

  $scope.removeForm = function (form) {
    if ($window.confirm('Are you sure you want to delete the form?')) {

      Form.remove(form).then(function() {
        inform.add('Form has been deleted', { type: 'success' });
      });

//      var idx = app.utils.indexOf(forms, form);
//      forms.splice(idx, 1);
//
//
    }
  };

  $scope.displayDataEntries = function (form) {
    $location.path('/forms/data/' + form.id);
  };

});

