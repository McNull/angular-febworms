describe('febworms-property-field-directive', function() {

  var $scope;

  beforeEach(function() {
    module('febworms');

    inject(function($rootScope) {
      $scope = $rootScope.$new();
    });
  });

  describe('when linking', function() {

    var febwormsPropertyFieldLinkFn;

    beforeEach(function() {

      inject(function(_febwormsPropertyFieldLinkFn_) {
        febwormsPropertyFieldLinkFn = _febwormsPropertyFieldLinkFn_;
      });
    });

    it('should observe the febwormsPropertyField attribute', function() {

      // Arrange

      var myFieldName = "12345";

      var $attrs = {
        $observe: function(attribute, fn) {
          if(attribute === 'febwormsPropertyField') {
            fn(myFieldName);
          }
        }
      };

      // Act

      febwormsPropertyFieldLinkFn($scope, {}, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.fieldName).toBe(myFieldName);

    });

    it('should observe the febwormsPropertyFieldLabel attribute', function() {

      // Arrange

      var myFieldLabel = "12345";

      var $attrs = {
        $observe: function(attribute, fn) {
          if(attribute === 'febwormsPropertyFieldLabel') {
            fn(myFieldLabel);
          }
        }
      };

      // Act

      febwormsPropertyFieldLinkFn($scope, {}, $attrs, []);
      $scope.$digest();

      // Assert

      expect($scope.fieldLabel).toBe(myFieldLabel);
      
    });
  });

});