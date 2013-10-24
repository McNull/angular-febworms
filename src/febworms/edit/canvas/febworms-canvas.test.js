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

  describe('unique field name directive', function () {
    var template =
      '<form name="myForm" novalidate>' +
        '<input type="text" name="fieldName" ng-model="field.name" febworms-unique-field-name>' +
        '<input type="text" name="fieldName2" ng-model="field2.name" febworms-unique-field-name>' +
      '</form>';

    beforeEach(function () {

      $scope.schema = {
        fields: [
          new febworms.Field('myType', { name: 'name1' }),
          new febworms.Field('myType', { name: 'name2' })
        ]};

      $scope.field = $scope.schema.fields[0];
      $scope.field2 = $scope.schema.fields[1];
    });

    function isFieldError(form, fieldName, errorType) {
      return form.$invalid && form.$error[errorType] !== undefined &&
             form[fieldName].$invalid && form[fieldName].$error[errorType] !== undefined;
    }

    it('should set field error on init', function () {

      // Arrange

      $scope.schema.fields[0].name = 'notunique';
      $scope.schema.fields[1].name = 'notunique';

      var element = $(template);

      // Act

      $compile(element)($scope);

      // Assert

      expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(true);
    });

    it('should NOT set field error on init when unique field names', function () {

      // Arrange

      $scope.schema.fields[0].name = 'unique1';
      $scope.schema.fields[1].name = 'unique2';

      var element = $(template);

      // Act

      $compile(element)($scope);

      // Assert

      expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(false);
    });

    it('should set field error after change', function () {

      // Arrange

      $scope.schema.fields[0].name = 'no_conflict';
      $scope.schema.fields[1].name = 'yet';

      var element = $(template);
      $compile(element)($scope);

      // Act

      $scope.schema.fields[0].name = 'yet';
      $scope.$digest();

      // Assert

      expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(true);
    });

    it('should set both conflicting fields to error after change', function () {

      // Arrange

      $scope.schema.fields[0].name = 'no_conflict';
      $scope.schema.fields[1].name = 'yet';

      var element = $(template);
      $compile(element)($scope);

      // Act

      $scope.schema.fields[0].name = 'yet';
      $scope.$digest();

      // Assert

      expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(true);
      expect(isFieldError($scope.myForm, 'fieldName2', 'unique')).toBe(true);
    });

    it('should set both conflicting fields to valid after change', function () {

      // Arrange

      $scope.schema.fields[0].name = 'conflict';
      $scope.schema.fields[1].name = 'conflict';

      var element = $(template);
      $compile(element)($scope);

      // Act

      $scope.schema.fields[0].name = 'no_conflict';
      $scope.$digest();

      // Assert

      expect(isFieldError($scope.myForm, 'fieldName', 'unique')).toBe(false);
      expect(isFieldError($scope.myForm, 'fieldName2', 'unique')).toBe(false);
    });
  });

  describe('field properties directive', function () {

    var template = '<div data-febworms-canvas-field-properties data-field="myField" data-schema="schema"></div>';

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
});