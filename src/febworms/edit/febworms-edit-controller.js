angular.module('febworms').controller('febwormsEditController', function ($scope, febwormsUtils) {

  if (!$scope.schema) {
    throw Error('Schema attribute not set.')
  }

  if (!angular.isArray($scope.schema.fields)) {
    $scope.schema.fields = [];
  }

  $scope.$watch(function (scope) {

    if (scope.schema) {
      scope.schema.$_invalid = false;

      _.forEach(scope.schema.fields, function (field) {
        if (field.$_invalid) {
          $scope.schema.$_invalid = true;
          return false; // break
        }
      });
    }
  });

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -

  var nextAutoFieldCount = 1;

  $scope.copyPaletteField = function(field) {
    var copy = angular.copy(field);
    copy.id = copy.name = 'field' + nextAutoFieldCount++;
    return copy;
  };

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -

  $scope.addFieldToSchema = function (field) {
    field = $scope.copyPaletteField(field);
    $scope.schema.fields.push(field);
  };

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -

  $scope.removeFieldFromSchema = function (index) {
    $scope.schema.fields.splice(index, 1);
  };

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -

  $scope.swapFieldsInSchema = function (idx1, idx2) {
    if (idx1 <= -1 || idx2 <= -1 || idx1 >= $scope.schema.fields.length || idx2 >= $scope.schema.fields.length) {
      return;
    }

    $scope.schema.fields[idx1] = $scope.schema.fields.splice(idx2, 1, $scope.schema.fields[idx1])[0];
  };

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -

  $scope.initField = function (field) {

    if (!field.type) {
      throw Error('Field has no type.');
    }

    var areas = [ 'palette', 'canvas', 'properties' ];

    field.$_templateUrl = field.$_templateUrl || [];

    _.forEach(areas, function (area) {
      field.$_templateUrl[area] = field.$_templateUrl[area] || febwormsUtils.getTemplateUrl(field, area);
    });
  };

  // - - - 8-< - - - - - - - - - - - - - - - - - - - - -
});
