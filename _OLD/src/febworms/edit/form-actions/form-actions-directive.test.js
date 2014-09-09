describe('febworms-form-actions-directive', function () {

  var $compile, $scope, febwormsConfigMock = {}, editCtrlMock = {}, $element;

  beforeEach(function () {

    module('febworms');

    module(function ($provide) {
      $provide.constant('febwormsConfig', febwormsConfigMock);
    });

    inject(function (_$compile_, _$rootScope_) {

      $compile = _$compile_;

      $scope = _$rootScope_.$new();
      $scope.actionsEnabled = true;
      $scope.schema = {};

      // Needed for the require directive flag
      
      $element = angular.element('<div></div>');
      $element.data('$febwormsEditController', editCtrlMock);
      
    });
  });

  it('should compile the template', function () {

    // Arrange

    var template = '<div febworms-edit-form-actions></div>';

    $element.append(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();
    var result = $element.find('.febworms-edit-form-actions');

    // Assert

    expect(result.length).toBe(1);
  });

  it('should use the enableDebugInfo property from configuration', function () {

    // Arrange

    febwormsConfigMock.enableDebugInfo = "an invalid but testable value";

    $element.append('<div febworms-edit-form-actions></div>');
    $compile($element)($scope);

    // Act

    $scope.$digest();
    var $childScope = $element.children().scope();

    // Assert

    expect($childScope.debugInfoEnabled).toBe(febwormsConfigMock.enableDebugInfo);

  });

  describe('togglePreview', function () {
    it('should call togglePreview on edit controller', function () {

      // Arrange

      editCtrlMock.togglePreview = jasmine.createSpy('togglePreview');

      $element.append('<div febworms-edit-form-actions></div>');
      $compile($element)($scope);
      $scope.$digest();
      var $childScope = $element.children().scope();

      // Act

      $childScope.togglePreview();

      // Assert

      expect(editCtrlMock.togglePreview).toHaveBeenCalled();

    });

    it('should not call togglePreview on edit controller when invalid schema', function () {

      // Arrange

      $scope.schema.$_invalid = true;
      editCtrlMock.togglePreview = jasmine.createSpy('togglePreview');

      $element.append('<div febworms-edit-form-actions></div>');
      $compile($element)($scope);
      $scope.$digest();
      var $childScope = $element.children().scope();

      // Act

      $childScope.togglePreview();

      // Assert

      expect(editCtrlMock.togglePreview).not.toHaveBeenCalled();

    });
  });

  describe('handleSave', function () {
    it('should call $scope.onSave', function () {

      // Arrange

      $scope.onSave = jasmine.createSpy('onSave');

      $element.append('<div febworms-edit-form-actions></div>');

      $compile($element)($scope);
      $scope.$digest();
      var $childScope = $element.children().scope();

      // Act

      $childScope.handleSave();

      // Assert

      expect($scope.onSave).toHaveBeenCalledWith({ schema: $scope.schema });

    });

    it('should not call $scope.onSave when invalid schema', function () {

      // Arrange

      $scope.schema.$_invalid = true;
      $scope.onSave = jasmine.createSpy('onSave');

      $element.append('<div febworms-edit-form-actions></div>');

      $compile($element)($scope);
      $scope.$digest();
      var $childScope = $element.children().scope();

      // Act

      $childScope.handleSave();

      // Assert

      expect($scope.onSave).not.toHaveBeenCalled();

    });
  });

  describe('handleCancel', function () {
    it('should call $scope.onCancel', function () {

      // Arrange

      $scope.onCancel = jasmine.createSpy('onCancel');

      $element.append('<div febworms-edit-form-actions></div>');

      $compile($element)($scope);
      $scope.$digest();
      var $childScope = $element.children().scope();

      // Act

      $childScope.handleCancel();

      // Assert

      expect($scope.onCancel).toHaveBeenCalledWith({ schema: $scope.schema });

    });
  });
});