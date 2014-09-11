app.controller('FormEditCtrl', function ($scope, $location, forms, $routeParams, inform) {

  var form = $routeParams.id ? forms[$routeParams.id] : {};
  $scope.form = angular.copy(form);

  $scope.onSave = function() {

    var saved = false;

    if($scope.form.id) {
      var idx = app.utils.indexOfMatch(forms, function(x) {
        return x.id === $scope.form.id;
      });

      if(idx !== -1) {
        forms.splice(1, 1, $scope.form);
        saved = true;
      }
    }

    if(!saved) {
      forms.push($scope.form);
    }

    inform.add('Form saved', { type: 'success' });

    $location.path('/form');
  };

  $scope.onCancel = function() {
    $location.path('/form');
  };

});