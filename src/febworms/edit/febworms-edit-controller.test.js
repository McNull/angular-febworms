describe('febworms-edit-controller', function() {

  beforeEach(module('febworms'));

  var $controller, $scope;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();

    $scope.schema = {};
  }));

  it('should construct the controller', function() {

    // Act

    var controller = $controller('febwormsEditController', { $scope: $scope });

    // Assert

    expect(controller).toBeDefined();
  });

  describe('addFieldToSchema', function() {

    it('should create addFieldToSchema function on scope', function() {

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.addFieldToSchema).toBeDefined();
      expect(angular.isFunction($scope.addFieldToSchema)).toBeTruthy();
    });

    it('should create a field array if the schema does not have one yet', function() {

      // Arrange

      $scope.schema.fields = undefined;
      $controller('febwormsEditController', { $scope: $scope });
      var field = {};

      // Act

      $scope.addFieldToSchema(field);

      // Assert

      expect($scope.schema.fields).toBeDefined();
      expect(angular.isArray($scope.schema.fields)).toBeTruthy();
    });

    it('should add field to schema', function() {

      // Arrange

      $controller('febwormsEditController', { $scope: $scope });
      var displayName = 'Can you see me?';
      var field = new febworms.Field(displayName);

      // Act

      $scope.addFieldToSchema(field);
      var result = _.find($scope.schema.fields, { displayName: displayName });

      // Assert

      expect(result).toBeDefined();
      expect(result.displayName).toBe(displayName);
    });

    it('should clone the provided field', function() {

      // Arrange

      $controller('febwormsEditController', { $scope: $scope });
      var displayName = 'I am a clone';
      var field = new febworms.Field(displayName);

      // Act

      $scope.addFieldToSchema(field);
      var result = _.find($scope.schema.fields, { displayName: displayName });

      // Assert

      expect(result).toBeDefined();
      expect(result).not.toBe(field);
    });

    it('should generate a unique id and name', function() {

      // Arrange

      $controller('febwormsEditController', { $scope: $scope });

      var displayName1 = 'DisplayName1';
      var field1 = new febworms.Field(displayName1);

      var displayName2 = 'DisplayName2';
      var field2 = new febworms.Field(displayName2);

      // Act

      $scope.addFieldToSchema(field1);
      $scope.addFieldToSchema(field2);

      var result1 = _.find($scope.schema.fields, { displayName: displayName1 });
      var result2 = _.find($scope.schema.fields, { displayName: displayName2 });

      // Assert

      expect(result1).toBeDefined();
      expect(result1.id).toBeDefined();
      expect(result1.name).toBeDefined();

      expect(result2).toBeDefined();
      expect(result2.id).toBeDefined();
      expect(result2.name).toBeDefined();

      expect(result1.id).not.toBe(result2.id);
      expect(result1.name).not.toBe(result2.name);
    });

  });
});