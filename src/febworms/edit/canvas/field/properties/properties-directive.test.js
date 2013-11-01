describe('febworms-edit-canvas-field-properties-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('febworms');

    inject(function(_$compile_, _$rootScope_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

    });
  });

  function setupElementAndScope(field, fields, template) {
    field = field || new febworms.Field('myType');
    fields = fields || [field];

    if (_.indexOf(fields, field) === -1) {
      fields.push(field);
    }

    $scope.myField = field;
    $scope.mySchema = {
      fields: fields
    };

    template = template || '<div febworms-edit-canvas-field-properties data-field="myField" data-schema="mySchema"></div>';

    return angular.element(template);
  }

  it('should compile directive', function() {

    // Arrange

    var $element = setupElementAndScope();

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result).toBeDefined();
    expect(result.hasClass('febworms-field-properties')).toBe(true);
  });

  describe('field name validation', function() {
    
    it('should set the field validation to invalid if the form validation fails', function() {

      // Arrange

      var $element = setupElementAndScope();

      $scope.myField.name = "valid"; // Name is a required value

      $compile($element)($scope);

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

    it('should set the field validation to valid if the form validation succeeds', function() {

      // Arrange

      var $element = setupElementAndScope();

      $scope.myField.name = ""; // Name is a required value

      $compile($element)($scope);

      $scope.$digest();

      var before = $scope.myField.$_invalid;

      // Act

      $scope.myField.name = "gedoe";

      $scope.$digest();

      var after = $scope.myField.$_invalid;

      // Assert

      expect(before).toBeTruthy();
      expect(after).toBeFalsy();

    });

    it('should not allow duplicate field names', function() {

      // Arrange

      var field1 = new febworms.Field('myType1', { name: 'notUnique' });
      var field2 = new febworms.Field('myType2', { name: 'notUnique' });

      var $element = setupElementAndScope(field1, [field1, field2]);

      $compile($element)($scope);

      $scope.$digest();

      var before = $scope.myField.$_invalid;

      // Act

      $scope.myField.name = "unique";

      $scope.$digest();

      var after = $scope.myField.$_invalid;

      // Assert

      expect(before).toBeTruthy();
      expect(after).toBeFalsy();

    });
  });

});