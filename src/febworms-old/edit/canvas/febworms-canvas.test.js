describe('febworms-canvas', function () {

  beforeEach(module('febworms'));

  var $compile, $scope;

  beforeEach(inject(function (_$compile_, _$rootScope_) {

    $compile = _$compile_;
    $scope = _$rootScope_.$new();

  }));

  describe('canvas directive', function () {

    var template = '<div data-febworms-canvas></div>';

    it('should compile directive', function () {

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


});