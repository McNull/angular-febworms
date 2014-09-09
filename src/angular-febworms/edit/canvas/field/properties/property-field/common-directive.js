angular.module('febworms').directive('febwormsPropertyFieldCommon', function(febwormsPropertyFieldCommonLinkFn) {
  return {
    restrict: 'AE',
    templateUrl: 'angular-febworms/edit/canvas/field/properties/property-field/common.ng.html',
    link: febwormsPropertyFieldCommonLinkFn
  };
}).factory('febwormsPropertyFieldCommonLinkFn', function() {
  return function($scope, $element, $attrs, ctrls) {

    $scope.fields = {
      fieldname: false,
      displayname: false,
      placeholder: false,
      tooltip: false,
      focus: false
    };

    $scope.$watch($attrs['febwormsPropertyFieldCommon'], function(value) {
      $scope.fields = angular.extend($scope.fields, value);
    });
  };
});