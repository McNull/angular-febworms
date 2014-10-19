app.controller('FormEditCtrl', function ($scope, $location, forms, $routeParams, inform, $window, formMetaInfo) {

  var form = app.utils.singleOrDefault(forms, function(x) {
    return x.id == $routeParams.id;
  }) || {};

  $scope.formMetaInfo = formMetaInfo;
  $scope.toggles = {
    preview: false, debug: false
  };

  $scope.form = angular.copy(form);
  $scope.form.$state = {};

  $scope.togglePreview = function() {
    if($scope.togglePreviewAllowed()) {
      $scope.toggles.preview = !$scope.toggles.preview;
      $scope.form.data = {};
    }
  };

  $scope.togglePreviewAllowed = function() {
    if($scope.toggles.preview) {
      return true;
    }

    return $scope.form.$state.$valid;
  };

  $scope.onSave = function() {

    if($scope.saveAllowed()) {
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

  $scope.saveAllowed = function() {

    if($scope.toggles.preview) {
      return false;
    }

    return $scope.form.$state.$valid;
  };

  $scope.onClose = function() {

    if($scope.toggles.preview) {
      $scope.togglePreview();
    } else {
      if($scope.form.$state && $scope.form.$state.$dirty && !$window.confirm('Discard unsaved changes?')) {
        return;
      }

      $location.path('/forms');
    }
  };


});