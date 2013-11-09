angular.module('febworms').controller('febwormsFormController', function($scope) {

  var self = this;
  this.model = {};

  this.updateFormModel = function(ngFormCtrl) {

    if (!$scope.formData) {
      $scope.formData = {};
    }

    if (!$scope.schema) {
      $scope.schema = {};
    }

    self.model.data = $scope.formData;
    self.model.schema = $scope.schema;
    self.model.state = ngFormCtrl;

    return self.model;
  };

});
