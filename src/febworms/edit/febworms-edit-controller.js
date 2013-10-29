angular.module('febworms').controller('febwormsEditController', function($scope) {

  $scope.schema = $scope.schema || {};

  $scope.preview = false;

  $scope.togglePreview = function() {
    $scope.preview = !$scope.preview;
  };
});