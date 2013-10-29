describe('febworms-edit-controller', function () {

  var $controller, $scope;

  beforeEach(function () {

    module('febworms');

    inject(function (_$controller_, _$rootScope_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();

    });

  });

  describe('schema', function () {
    it('should construct the controller', function () {

      // Arrange

      // Act

      var controller = $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect(controller).toBeDefined();
    });

    it('should create schema object if none on scope', function () {

      // Arrange

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.schema).toBeDefined();
    });

    it('should use schema from scope if already exist', function () {

      // Arrange

      var schema = { exists: true };
      $scope.schema = schema;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.schema).toBeDefined();
      expect($scope.schema).toBe(schema);
    });
  });

  describe('preview', function() {

    it('should set preview to false on init', function() {

      // Arrange

      $scope.preview = true;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.preview).toBe(false);
    });

    it('should toggle the preview', function() {

      // Arrange

      $controller('febwormsEditController', { $scope: $scope });
      $scope.preview = false;

      // Act

      $scope.togglePreview();
      var shouldBeTrue = $scope.preview;

      $scope.togglePreview();
      var shouldBeFalse = $scope.preview;

      // Assert

      expect(shouldBeTrue).toBe(true);
      expect(shouldBeFalse).toBe(false);
    });
  });
});