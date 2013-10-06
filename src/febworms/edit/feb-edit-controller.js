angular.module('febworms').controller('febEditController', function($scope) {

  $scope.schema.isValid = true;
  // $scope.schema is set by the parent controller
  // For some unknown reason the schema property isn't available directly.

//  $scope.$watch('schema.name', function(value) {
//    console.log(value);
//  });
//  $scope.$watch('myForm.$valid', function(value) {
//    console.log($scope.schema);
////    $scope.schema.isValid = value;
//  });

//  $scope.$watch('schema', function(value) {
//    console.log('schema', value);
//  });
//
//  $scope.fuck = function() {
//    console.log($scope.schema);
//  }
});
