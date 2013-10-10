angular.module('febworms').controller('febwormsEditController', function ($scope) {

  if (!$scope.schema) {
    throw Error('Schema attribute not set.')
  }

  if (!angular.isArray($scope.schema.fields)) {
    $scope.schema.fields = [];
  }

  // TODO: This should be dynamic
  $scope.schema.$_invalid = true;

  $scope.addFieldToSchema = function (field) {

    var copy = angular.copy(field);

    var fieldCount = $scope.schema.fields.length;
    copy.id = copy.name = 'field' + (fieldCount + 1);

    $scope.schema.fields.push(copy);
  };

  $scope.removeFieldFromSchema = function (index) {
    $scope.schema.fields.splice(index, 1);
  };

  $scope.swapFieldsInSchema = function (idx1, idx2) {
    if(idx1 <= -1 || idx2 <= -1 ||
      idx1 >= $scope.schema.fields.length ||
      idx2 >= $scope.schema.fields.length) {
      return;
    }

    $scope.schema.fields[idx1] = $scope.schema.fields.splice(idx2, 1, $scope.schema.fields[idx1])[0];
  };
});
