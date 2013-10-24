describe('febworms-canvas-field-properties', function () {

  var template = '<div data-febworms-canvas-field-properties data-field="myField" data-schema="schema"></div>';

  beforeEach(module('febworms'));

  var $compile, $scope;

  beforeEach(inject(function (_$compile_, _$rootScope_) {

    $compile = _$compile_;
    $scope = _$rootScope_.$new();

  }));


  beforeEach(function () {

    $scope.schema = {
      fields: [
        new febworms.Field('myType')
      ]};

    $scope.myField = $scope.schema.fields[0];
  });

  it('should compile directive', function () {

    // Arrange

    var element = $(template);

    // Act

    var result = $compile(element)($scope);
    $scope.$digest();

    // Assert

    expect(result).toBeDefined();
    expect(result.hasClass('febworms-field-properties')).toBe(true);
  });

  it('should set the field validation to invalid if the form validation fails', function () {

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