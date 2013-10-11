describe('febworms-canvas', function() {

  beforeEach(module('febworms'));

  var $compile, $scope;

  beforeEach(inject(function(_$compile_, _$rootScope_) {

    $compile = _$compile_;
    $scope = _$rootScope_.$new();

  }));

  describe('canvas directive', function() {

    var template = '<div data-febworms-canvas></div>';

    it('should compile directive', function() {

      // Arrange

      var element = $(template);

      // Act

      var result = $compile(element)($scope);
      $scope.$digest();

      // Assert

      expect(result).toBeDefined();
      expect(result.find('.febworms-canvas').length).toBe(1);
    });
  });

  describe('field properties directive', function() {

    var template = '<div data-febworms-canvas-field-properties data-field="myField"></div>';

    beforeEach(function() {
      $scope.myField = new febworms.Field('myType');
    });

    it('should compile directive', function() {

      // Arrange

      var element = $(template);

      // Act

      var result = $compile(element)($scope);
      $scope.$digest();

      // Assert

      expect(result).toBeDefined();
      expect(result[0].className).toBe('febworms-field-properties');
    });

    it('should set the field validation to invalid if the form validation fails', function() {

      // Arrange

      $scope.myField.name = "valid"; // Name is a required value

      var element = $(template);
      $compile(element)($scope);

      $scope.$digest();

      var before = $scope.myField.$_invalid;

      // Act

      $scope.myField.name = "";

      $scope.$digest();

      var after = $scope.myField.$_invalid;

      // Assert

      expect(before).toBeFalsy();
      expect(after).toBeTruthy();

    });

  });
});