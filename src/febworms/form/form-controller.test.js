describe('febworms-form-controller', function() {

  var $scope, $controller;

  beforeEach(function() {

    module('febworms');

    inject(function(_$rootScope_, _$controller_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
    });

  });

  it('should construct controller', function() {

    var controller = $controller('febwormsFormController', {
      $scope: $scope
    });

    expect(controller).toBeDefined();

  });

  it('should create model object', function() {

    var controller = $controller('febwormsFormController', {
      $scope: $scope
    });

    expect(controller.model).toBeDefined();

  });

  describe('updateFormModel', function() {

    it('should construct form model on scope', function() {

      // Arrange

      var modelCtrl = {};
      $scope.formData = {};
      $scope.schema = {};

      var controller = $controller('febwormsFormController', {
        $scope: $scope
      });

      // Act

      var result = controller.updateFormModel(modelCtrl);

      // Assert

      expect(result).toBeDefined();
      expect(result.data).toBe($scope.formData);
      expect(result.schema).toBe($scope.schema);
      expect(result.state).toBe(modelCtrl);
    });
    
  });

});