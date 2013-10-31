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

    it('should create a copy of the templates found in the configuration', function () {

      // Arrange

      var templates = febwormsConfigMock.fields.templates = [
        new febworms.Field('myType'), new febworms.Field('myOtherType')
      ];

      // Act

      $controller('febwormsEditPaletteController', { $scope: $scope, febwormsConfig: febwormsConfigMock });

      // Assert

      expect($scope.templates).toBeDefined();
      expect($scope.templates).not.toBe(templates);

      expect($scope.templates.length).toEqual(templates.length);

      _.forEach($scope.templates, function (copyTemplate) {

        var origTemplate = _.find(templates, { type: copyTemplate.type });

        expect(origTemplate).toBeDefined();
        expect(origTemplate).not.toBe(copyTemplate);

        _.forEach(origTemplate, function (value, key) {
          if (key !== 'id') {
            expect(value).toEqual(copyTemplate[key]);
          }
        });
      });
    });

    it('should should create an unique id for each template', function () {

      // Arrange

      var templates = febwormsConfigMock.fields.templates = [
        new febworms.Field('myType'), new febworms.Field('myOtherType')
      ];

      // Act

      $controller('febwormsEditPaletteController', { $scope: $scope, febwormsConfig: febwormsConfigMock });

      // Assert

      expect(_.uniq($scope.templates, 'id').length).toBe(templates.length);
    });

    describe('templateFilter', function () {

      it('should include all templates when no category has been selected', function () {

        // Arrange

        $controller('febwormsEditPaletteController', { $scope: $scope, febwormsConfig: febwormsConfigMock });

        $scope.selectedCategory = null;

        // Act

        var result = $scope.templateFilter({});

        // Assert

        expect(result).toBe(true);
      });

      it('should not include templates on category mismatch', function () {

        // Arrange

        var templates = febwormsConfigMock.fields.templates = [
          new febworms.Field('myType'), new febworms.Field('myOtherType')
        ];

        var categories = febwormsConfigMock.fields.categories = {
          'myCategory': { 'myType': true },
          'myOtherCategory': { 'myOtherType': true }
        };

        $controller('febwormsEditPaletteController', { $scope: $scope, febwormsConfig: febwormsConfigMock });

        $scope.selectedCategory = categories['myOtherCategory'];

        // Act

        var result = $scope.templateFilter(templates[0]);

        // Assert

        expect(result).toBeFalsy();
      });

      it('should include templates on category match', function () {

        // Arrange

        var templates = febwormsConfigMock.fields.templates = [
          new febworms.Field('myType'), new febworms.Field('myOtherType')
        ];

        var categories = febwormsConfigMock.fields.categories = {
          'myCategory': { 'myType': true },
          'myOtherCategory': { 'myOtherType': true }
        };

        $controller('febwormsEditPaletteController', { $scope: $scope, febwormsConfig: febwormsConfigMock });

        $scope.selectedCategory = categories['myCategory'];

        // Act

        var result = $scope.templateFilter(templates[0]);

        // Assert

        expect(result).toBe(true);
      });

    })

  });

});
