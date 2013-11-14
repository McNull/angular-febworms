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

    it('should construct form model', function() {

      // Arrange

      var data = {};
      var schema = {};
      var state = {};

      var controller = $controller('febwormsFormController', {
        $scope: $scope
      });

      // Act

      var result = controller.updateFormModel(data, schema, state);

      // Assert

      expect(result).toBeDefined();
      expect(result.data).toBe(data);
      expect(result.schema).toBe(schema);
      expect(result.state).toBe(state);
    });
    
  });

});