angular.module('febworms').controller('febwormsFormController', function($scope) {

  var self = this;
  this.model = {};

  this.updateFormModel = function(ngFormCtrl) {
    // Called by the directive
    
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
