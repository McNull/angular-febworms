angular.module('myApp2', []).controller('MainCtrl', function ($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate', 'AngularJS', 'Karma', 'mytest'
  ];
});

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp2'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(4);
  });
});

describe('febworms-edit-controller', function () {

  beforeEach(module('febworms'));

  var $controller, $scope;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();

    $scope.schema = {};
  }));

  it('should construct the controller', function () {

    // Act

    var controller = $controller('febwormsEditController', { $scope: $scope });

    // Assert

    expect(controller).toBeDefined();
  });

  describe('schema (in)valid', function () {

    it('should set schema valid on empty field list', function () {

      // Arrange

      $controller('febwormsEditController', { $scope: $scope });

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBeFalsy();
    });

    it('should set schema to invalid with invalid fields', function () {

      // Arrange

      $scope.schema.fields = [
        { $_invalid: true }
      ];

      $controller('febwormsEditController', { $scope: $scope });

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBeTruthy();
    });

    it('should set schema back to valid when field is valid again', function () {

      // Arrange

      $scope.schema.fields = [
        { $_invalid: true }
      ];

      $controller('febwormsEditController', { $scope: $scope });
      $scope.$digest();

      // Act

      var before = $scope.schema.$_invalid;
      $scope.schema.fields[0].$_invalid = false;
      $scope.$digest();
      var after = $scope.schema.$_invalid;
      // Assert

      expect(before).toBeTruthy();
      expect(after).toBeFalsy();
    });
  });

  describe('addFieldToSchema', function () {

    it('should create addFieldToSchema function on scope', function () {

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.addFieldToSchema).toBeDefined();
      expect(angular.isFunction($scope.addFieldToSchema)).toBeTruthy();
    });

    it('should create a field array if the schema does not have one yet', function () {

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

    it('should add field to schema', function () {

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

    it('should clone the provided field', function () {

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

    it('should generate a unique id and name', function () {

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

    it('should generate a unique id and name after modification of list', function () {

      // Arrange

      $controller('febwormsEditController', { $scope: $scope });

      var displayName1 = 'DisplayName1';
      var field1 = new febworms.Field(displayName1);

      var displayName2 = 'DisplayName2';
      var field2 = new febworms.Field(displayName2);

      var displayName3 = 'DisplayName3';
      var field3 = new febworms.Field(displayName3);

      $scope.addFieldToSchema(field1);
      $scope.addFieldToSchema(field2);

      // Act

      $scope.removeFieldFromSchema(field1);
      $scope.addFieldToSchema(field3);

      var result1 = _.find($scope.schema.fields, { displayName: displayName1 });
      var result2 = _.find($scope.schema.fields, { displayName: displayName2 });
      var result3 = _.find($scope.schema.fields, { displayName: displayName3 });

      // Assert

      expect(result1).toBeUndefined();

      expect(result3).toBeDefined();
      expect(result3.id).toBeDefined();
      expect(result3.name).toBeDefined();

      expect(result2).toBeDefined();
      expect(result2.id).toBeDefined();
      expect(result2.name).toBeDefined();

      expect(result3.id).not.toBe(result2.id);
      expect(result3.name).not.toBe(result2.name);
    });

  });

  describe('removeFieldFromSchema', function () {

    it('should remove field by index', function () {

      // Arrange

      var index = 1;

      $scope.schema.fields = [
        { name: 'Ein' },
        { name: 'Zwein' },
        { name: 'Drein' }
      ];

      $controller('febwormsEditController', { $scope: $scope });

      // Act

      $scope.removeFieldFromSchema(index);

      // Assert

      expect($scope.schema.fields.length).toBe(2);
      expect(_.find($scope.schema.fields, { name: 'Zwein' })).toBeFalsy();
    });
  });

  describe('swapFieldsInSchema', function () {

    it('should swap fields by indices', function () {

      // Arrange

      $scope.schema.fields = [
        { name: 'Ein' },
        { name: 'Zwein' },
        { name: 'Drein' }
      ];

      $controller('febwormsEditController', { $scope: $scope });

      // Act

      $scope.swapFieldsInSchema(0, 1);

      // Assert

      expect($scope.schema.fields[0].name).toBe('Zwein');
      expect($scope.schema.fields[1].name).toBe('Ein');
      expect($scope.schema.fields[2].name).toBe('Drein');

    });

    it('should NOT swap fields on array edges', function () {

      // Arrange

      $controller('febwormsEditController', { $scope: $scope });

      function isUnchangedAfterSwap(idx1, idx2) {

        $scope.schema.fields = [
          { name: 'Ein' },
          { name: 'Zwein' },
          { name: 'Drein' }
        ];

        $scope.swapFieldsInSchema(idx1, idx2);

        return $scope.schema.fields[0] && $scope.schema.fields[0].name === 'Ein' && $scope.schema.fields[1] && $scope.schema.fields[1].name === 'Zwein' && $scope.schema.fields[2] && $scope.schema.fields[2].name === 'Drein';
      }

      // Act & Assert

      expect(isUnchangedAfterSwap(-1, 0)).toBeTruthy();
      expect(isUnchangedAfterSwap(0, -1)).toBeTruthy();
      expect(isUnchangedAfterSwap(3, 0)).toBeTruthy();
      expect(isUnchangedAfterSwap(0, 3)).toBeTruthy();
      expect(isUnchangedAfterSwap(-1, 3)).toBeTruthy();
      expect(isUnchangedAfterSwap(3, -1)).toBeTruthy();
    });
  });
});