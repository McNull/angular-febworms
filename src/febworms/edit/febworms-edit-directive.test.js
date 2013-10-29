describe('febworms-edit-directive', function() {

  var $compile, $scope;

  beforeEach(function () {

    module('febworms');

    inject(function(_$compile_, $rootScope) {
      $compile = _$compile_;
      $scope = $rootScope.$new();
    });

  });

  it('should compile the template', function() {

    // Arrange

    var template = '<div febworms-edit></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.hasClass('febworms-edit')).toBe(true);
  });

  it('should bind the schema object on scope', function() {

    // Arrange

    $scope.form = {};

    var template = '<div febworms-edit data-schema="form.schema"></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($scope.form.schema).toBeDefined();
  });

  it('should reuse schema object from scope', function() {

    // Arrange

    var schema = {
      exists: true
    };

    $scope.form = {
      schema: schema
    };

    var template = '<div febworms-edit data-schema="form.schema"></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($scope.form.schema).toBe(schema);
  });
});