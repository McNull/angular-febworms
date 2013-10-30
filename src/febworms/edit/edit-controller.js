angular.module('febworms').controller('febwormsEditController', function($scope, febwormsConfig) {

  this.test = "dkdkdkdkd";

  $scope.schema = $scope.schema || {};
  $scope.metaForm = $scope.metaForm || {};

  $scope.preview = false;

  $scope.debugInfoEnabled = febwormsConfig.enableDebugInfo;
  $scope.previewEnabled = $scope.previewEnabled === undefined ? true : $scope.previewEnabled;
  $scope.actionsEnabled = $scope.debugInfoEnabled || $scope.previewEnabled || $scope.onSave.set || $scope.onCancel.set;

  $scope.togglePreview = function() {
    if(!$scope.schema.$_invalid) {
      $scope.preview = !$scope.preview;
    }
  };

  $scope.handleSave = function() {
    if(!$scope.schema.$_invalid) {
      $scope.onSave();
    }
  };

  $scope.handleCancel = function() {
    $scope.onCancel();
  };

  $scope.$watch(function() {
    $scope.schema.$_invalid = $scope.metaForm.$invalid;
  });

  $scope.setMetaForm = function(metaForm) {
    $scope.metaForm = metaForm;
  };

});