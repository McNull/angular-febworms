angular.module('febworms').controller('febwormsEditController', function($scope) {

  var self = this;

  this.setMetaForm = function(metaForm) {
    self.metaForm = metaForm;
  };

  this.togglePreview = function() {
    $scope.preview = !$scope.preview;
  };

  $scope.$watch(function() {
    $scope.schema.$_invalid = self.metaForm ? self.metaForm.$invalid : false;
  });

  
});