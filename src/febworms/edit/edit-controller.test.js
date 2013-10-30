describe('febworms-edit-controller', function () {

  var $controller, $scope, febwormsConfig;

  beforeEach(function () {

    module('febworms');

    inject(function (_$controller_, _$rootScope_, _febwormsConfig_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      febwormsConfig = _febwormsConfig_;

      // Supplied by directive

      $scope.onSave = $scope.onCancel = angular.noop;

      // Supplied by template

      $scope.metaForm = {};
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

  describe('previewEnabled', function() {

    it('should set previewEnabled to true by default', function() {

      // Arrange

      $scope.previewEnabled = undefined;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.previewEnabled).toBe(true);

    });

    it('should use previewEnabled scope value (false)', function() {

      // Arrange

      $scope.previewEnabled = false;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.previewEnabled).toBeFalsy();

    });

    it('should use previewEnabled scope value (true)', function() {

      // Arrange

      $scope.previewEnabled = true;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.previewEnabled).toBe(true);

    });
  });

  describe('actionsEnabled', function() {

    it('should set actionsEnabled to false if no actions available', function() {

      // Arrange

      $scope.previewEnabled = false;
      febwormsConfig.enableDebugInfo = false;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.actionsEnabled).toBeFalsy();
    });

    it('should set actionsEnabled to true if previewEnabled', function() {

      // Arrange

      $scope.previewEnabled = true;
      febwormsConfig.enableDebugInfo = false;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.actionsEnabled).toBe(true);
    });

    it('should set actionsEnabled to true if onSave set', function() {

      // Arrange

      $scope.previewEnabled = false;
      $scope.onSave.set = true;
      febwormsConfig.enableDebugInfo = false;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.actionsEnabled).toBe(true);
    });

    it('should set actionsEnabled to true if onCancel set', function() {

      // Arrange

      $scope.previewEnabled = false;
      $scope.onCancel.set = true;
      febwormsConfig.enableDebugInfo = false;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.actionsEnabled).toBe(true);
    });

    it('should set actionsEnabled to true if enableDebugInfo set', function() {

      // Arrange

      $scope.previewEnabled = false;
      febwormsConfig.enableDebugInfo = true;

      // Act

      $controller('febwormsEditController', { $scope: $scope });

      // Assert

      expect($scope.actionsEnabled).toBe(true);
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

  describe('schema validation (schema.$_invalid)', function() {

    it('should set schema invalid when metaForm input is invalid', function() {

      // Arrange

      $scope.metaForm.$invalid = true;

      // Act

      $controller('febwormsEditController', { $scope: $scope });
      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(true);
    });

    it('should set schema valid when metaForm input is valid', function() {

      // Arrange

      $scope.metaForm.$invalid = false;

      // Act

      $controller('febwormsEditController', { $scope: $scope });
      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(false);
    });

  });
});