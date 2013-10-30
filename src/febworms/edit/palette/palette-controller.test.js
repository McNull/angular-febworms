describe('febworms-edit-palette', function () {

  var $controller, $scope, febwormsConfigMock, $compile, $templateCache;

  beforeEach(function () {

    module('febworms');

    febwormsConfigMock = {
      fields: {
        templates: [],
        categories: []
      }
    };

    module(function ($provide) {
      $provide.constant('febwormsConfig', febwormsConfigMock);
    });

    inject(function (_$controller_, _$rootScope_, _$compile_, _$templateCache_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });
  });

  describe('controller', function () {

    it('should assign scope properties', function () {

      // Arrange

      febwormsConfigMock.fields.templates = [
        new febworms.Field('myType')
      ];

      febwormsConfigMock.fields.categories = {
        'myCategory': ['myType']
      };

      var categoryKeys = _.keys(febwormsConfigMock.fields.categories);

      // Act

      $controller('febwormsPaletteController', {
        $scope: $scope,
        febwormsConfig: febwormsConfigMock
      });

      // Assert

      expect($scope.palette.fields).toBe(febwormsConfigMock.fields.templates);
      expect($scope.palette.categoryKeys).toEqual(categoryKeys);
      expect($scope.palette.categoryKey).toBeDefined();
    });

    it('should keep track of the selected category', function () {

      // Arrange

      febwormsConfigMock.fields.templates = [
        new febworms.Field('myType'), new febworms.Field('myOtherType')
      ];

      febwormsConfigMock.fields.categories = {
        'myCategory': ['myType'],
        'myOtherCategory': ['myOtherType']
      };

      $controller('febwormsPaletteController', {
        $scope: $scope,
        febwormsConfig: febwormsConfigMock
      });

      $scope.$digest();

      var expected = febwormsConfigMock.fields.categories['myOtherCategory'];

      // Act

      $scope.palette.categoryKey = 'myOtherCategory';
      $scope.$digest();

      var result = $scope.palette.category;

      // Assert

      expect(result).toBe(expected);
    });

  });

});
