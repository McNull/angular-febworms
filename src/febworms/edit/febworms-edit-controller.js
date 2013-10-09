angular.module('febworms').controller('febwormsEditController', function($scope) {

  if(!$scope.schema) {
    throw Error('Schema attribute not set.')
  }

  // TODO: This should be dynamic
  $scope.schema.$_invalid = true;

  $scope.addFieldToSchema = function(field) {
    if(!angular.isArray($scope.schema.fields)) {
      $scope.schema.fields = [];
    }

    var copy = angular.copy(field);

    var fieldCount = $scope.schema.fields.length;
    copy.id = copy.name = 'field' + (fieldCount + 1);

    $scope.schema.fields.push(copy);
  };


});
