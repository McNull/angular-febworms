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

  describe('$scope.schema', function () {

    it('should create a new schema object if none is provided', function () {

      // Arrange

      var template = '<div febworms-edit></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.schema).toBeDefined();

    });

    it('should use the provided schema object', function () {

      // Arrange

      $scope.mySchema = { mySchema: true };

      var template = '<div febworms-edit data-schema="mySchema"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.schema).toBe($scope.mySchema);

    });

  });

  describe('$scope.actionsEnabled', function () {

    it('should default to true if no value is provided', function () {

      // Arrange

      var template = '<div febworms-edit></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.actionsEnabled).toBe(true);

    });

    it('should use the provided actionsEnabled value', function () {

      // Arrange

      $scope.myActionsEnabled = false;

      var template = '<div febworms-edit data-actions-enabled="myActionsEnabled"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.actionsEnabled).toBe($scope.myActionsEnabled);
    });

  });

  describe('$scope.preview', function () {

    it('should default to false if no value is provided', function () {

      // Arrange

      var template = '<div febworms-edit></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.preview).toBe(false);

    });

    it('should use the provided preview value', function () {

      // Arrange

      $scope.myPreview = true;

      var template = '<div febworms-edit data-preview="myPreview"></div>';
      var $element = angular.element(template);

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $childScope = $scope.$$childHead;

      // Assert

      expect($childScope.preview).toBe($scope.myPreview);
    });

  });

});