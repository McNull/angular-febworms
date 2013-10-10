describe('febworms palette', function () {


  beforeEach(module('febworms'));

  var $controller, $scope, febwormsConfig, $compile;

  beforeEach(inject(function (_$controller_, _$rootScope_, _febwormsConfig_, _$compile_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    febwormsConfig = _febwormsConfig_;
    $compile = _$compile_;
  }));

  describe('controller', function () {

    it('should assign fields config to scope', function () {

      // Act

      $controller('febwormsPaletteController', {
        $scope: $scope,
        febwormsConfig: febwormsConfig
      });

      // Assert

      expect($scope.fields).toBe(febwormsConfig.fields);
    });
  });

  describe('directive', function() {

    var template = '<div data-febworms-palette></div>';

    it('should compile the template', function() {

      // Arrange

      var element = angular.element(template);

      // Act

      var result = $compile(element)($scope);
      $scope.$digest();

      // Assert

      expect(result.find('.febworms-palette').length).toBe(1);
    });

    describe('febworms-palette-field', function() {

      it('should render all field templates from config', function() {

        // Arrange

        var fieldCount = febwormsConfig.fields.length;
        var $element = $compile($(template))($scope);

        // Act

        $scope.$digest();
        var result = $element.find('.febworms-palette-field');

        // Assert

        expect(result.length).toBe(fieldCount);

      });

      it('should call the addFieldToSchema on overlay double click', function() {

        // Arrange

        $scope.addFieldToSchema = angular.noop;
        spyOn($scope, 'addFieldToSchema');

        var $element = $compile($(template))($scope);
        $scope.$digest();

        var field = febwormsConfig.fields[0];

        // Act

        $element.find('.febworms-palette-field-overlay').first().dblclick();

        // Assert

        expect($scope.addFieldToSchema).toHaveBeenCalledWith(field);
      });

      it('should call the addFieldToSchema on button click', function() {

        // Arrange

        $scope.addFieldToSchema = angular.noop;
        spyOn($scope, 'addFieldToSchema');

        var $element = $compile($(template))($scope);
        $scope.$digest();

        var field = febwormsConfig.fields[0];

        // Act

        $element.find('.btn').first().click();

        // Assert

        expect($scope.addFieldToSchema).toHaveBeenCalledWith(field);
      });
    });
  });
});
