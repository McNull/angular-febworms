describe('options-directive', function() {

  var $scope;

  beforeEach(function() {

    module('febworms');

    inject(function($rootScope) {
      $scope = $rootScope.$new();
    });

  });

  describe('when linking', function() {

    var linkFn;

    beforeEach(function() {

      inject(function(febwormsPropertyFieldOptionsLinkFn) {
        linkFn = febwormsPropertyFieldOptionsLinkFn;
      });

    });

    xit('should observe main attribute for field object', function() {

      // Arrange

      $scope.myField = {};

      var $attrs = {
        febwormsPropertyFieldOptionsLinkFn: 'myField'
      };

      // Act

      linkFn($scope, null, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.field).toBe($scope.myField);

    });

  });

});