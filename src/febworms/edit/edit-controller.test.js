describe('febworms-edit-controller', function () {

  var $controller, $scope, febwormsConfig;

  beforeEach(function () {

    module('febworms');

    inject(function (_$controller_, _$rootScope_, _febwormsConfig_) {

      $controller = _$controller_;

      febwormsConfig = _febwormsConfig_;

      $scope = _$rootScope_.$new();

      // Supplied by directive

      $scope.schema = {};

    });

  });

  it('should construct the controller', function () {

    // Arrange


    // Act

    var controller = $controller('febwormsEditController', { $scope: $scope });

    // Assert

    expect(controller).toBeDefined();
  });

  describe('schema.$_invalid', function () {

    it('should be invalid when metaForm is not available', function() {

      // Arrange

      var controller = $controller('febwormsEditController', { $scope: $scope });

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(false);

    });

    it('should be invalid when metaForm is invalid', function() {

      // Arrange

      var metaForm = { $invalid: true };
      var controller = $controller('febwormsEditController', { $scope: $scope });
      controller.setMetaForm(metaForm);

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(true);

    });

    it('should not be invalid when metaForm is not invalid', function() {

      // Arrange

      var metaForm = { $invalid: false };
      var controller = $controller('febwormsEditController', { $scope: $scope });
      controller.setMetaForm(metaForm);

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(false);

    });

  });


});