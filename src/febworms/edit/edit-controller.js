angular.module('febworms').controller('febwormsEditController', function($scope, febwormsUtils) {

  var self = this;

  this.setMetaForm = function(metaForm) {
    self.metaForm = metaForm;
  };

  this.togglePreview = function() {
    $scope.preview = !$scope.preview;
  };

  this.addField = function(field, index) {
    var copy = febwormsUtils.copyField(field);

    index = index === undefined ? $scope.schema.fields.length : index;
    $scope.schema.fields.splice(index, 0, copy);
  };

  this.removeField = function (index) {
    $scope.schema.fields.splice(index, 1);
  };

  this.swapFields = function (idx1, idx2) {
    if (idx1 <= -1 || idx2 <= -1 || idx1 >= $scope.schema.fields.length || idx2 >= $scope.schema.fields.length) {
      return;
    }

    $scope.schema.fields[idx1] = $scope.schema.fields.splice(idx2, 1, $scope.schema.fields[idx1])[0];
  };



  $scope.$watch(function() {
    $scope.schema.$_invalid = self.metaForm ? self.metaForm.$invalid : false;
  });


});