app.controller('FormEditCtrl', function ($scope, $location, forms, $routeParams, inform, $window) {

  var form = app.utils.singleOrDefault(forms, function(x) {
    return x.id == $routeParams.id;
  }) || {};

  $scope.form = angular.copy(form);
  $scope.form.$state = {};

  $scope.onSave = function() {

    if($scope.form.$state.$valid) {
      var existingForm = false;

      if($scope.form.id) {
        var idx = app.utils.indexOfMatch(forms, function(x) {
          return x.id === $scope.form.id;
        });

        if(idx !== -1) {
          forms.splice(1, 1, $scope.form);
          existingForm = true;
        }
      }

      if(!existingForm) {
        forms.push($scope.form);
      }

      inform.add('Form saved', { type: 'success' });

      $location.path('/forms');
    }
  };

  $scope.onClose = function() {

    if($scope.form.$state && $scope.form.$state.$dirty && !$window.confirm('Discard unsaved changes?')) {
      return;
    }

    $location.path('/forms');
  };

});