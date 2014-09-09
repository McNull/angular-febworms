describe('febworms-property-field-common', function() {

  var $scope;

  beforeEach(function() {
    module('febworms');

    inject(function($rootScope) {
      $scope = $rootScope.$new();
    });
  });

  describe('when linking', function() {

    var febwormsPropertyFieldCommonLinkFn;

    beforeEach(function() {

      inject(function(_febwormsPropertyFieldCommonLinkFn_) {
        febwormsPropertyFieldCommonLinkFn = _febwormsPropertyFieldCommonLinkFn_;
      });
    });

    it('should observe and extend the febwormsPropertyFieldCommon attribute into the fields scope value', function() {

      // Arrange

      var $attrs = {
        febwormsPropertyFieldCommon: '{ fieldname: true, myOtherProp: "gedoe" }'
      };

      // Act

      febwormsPropertyFieldCommonLinkFn($scope, {}, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.fields).toBeDefined();
      expect($scope.fields.fieldname).toBe(true);
      expect($scope.fields.displayname).toBeFalsy();
      expect($scope.fields.placeholder).toBeFalsy();
      expect($scope.fields.myOtherProp).toBe('gedoe');
    });
  });

});