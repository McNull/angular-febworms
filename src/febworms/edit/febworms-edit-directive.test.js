describe('febworms-edit-directive', function () {

  var $compile, $scope;

  beforeEach(function () {

    module('febworms');

    inject(function (_$compile_, $rootScope) {
      $compile = _$compile_;
      $scope = $rootScope.$new();
    });

  });

  it('should compile the template', function () {

    // Arrange

    var template = '<div febworms-edit></div>';
    var $element = angular.element(template);

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.hasClass('febworms-edit')).toBe(true);
  });

  describe('onSave', function() {

    it('should indicate if the onSave attribute has been supplied', function() {
      // Arrange

      $scope.onSave = angular.noop;
      var template = '<div febworms-edit data-on-save="onSave()"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      $scope = $scope.$$childHead;

      // Assert

      expect($scope.onSave).toBeDefined();
      expect($scope.onSave.set).toBe(true);
    });

    it('should indicate if the onSave attribute has not been supplied', function() {
      // Arrange

      var template = '<div febworms-edit></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      $scope = $scope.$$childHead;

      // Assert

      expect($scope.onSave).toBeDefined();
      expect($scope.onSave.set).toBe(false);
    });

  });

  describe('onCancel', function() {

    it('should indicate if the onCancel attribute has been supplied', function() {
      // Arrange

      var template = '<div febworms-edit data-on-cancel="onCancel()"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      $scope = $scope.$$childHead;

      // Assert

      expect($scope.onCancel).toBeDefined();
      expect($scope.onCancel.set).toBe(true);
    });

    it('should indicate if the onCancel attribute has not been supplied', function() {
      // Arrange

      var template = '<div febworms-edit></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      $scope = $scope.$$childHead;

      // Assert

      expect($scope.onCancel).toBeDefined();
      expect($scope.onCancel.set).toBe(false);
    });

  });

  describe('$scope.schema', function () {
    it('should bind the schema object on scope', function () {

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

    it('should reuse schema object from scope', function () {

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
});