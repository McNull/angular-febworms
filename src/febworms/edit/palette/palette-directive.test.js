describe('febworms-edit-palette', function () {

  var $controller, $scope, febwormsConfigMock, $compile, $templateCache, febwormsUtils, $fixture, schemaCtrl = {};

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

    inject(function (_$controller_, _$rootScope_, _$compile_, _$templateCache_, _febwormsUtils_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
      febwormsUtils = _febwormsUtils_;
    });

    $fixture = angular.element('<div></div>');

    $fixture.data('$febwormsSchemaController', schemaCtrl);
  });

  describe('directive', function () {

    var template = '<div febworms-edit-palette></div>';

    it('should compile the template', function () {

      // Arrange

      $fixture.append(template);

      // Act

      var result = $compile($fixture)($scope);
      $scope.$digest();

      // Assert

      expect(result.find('.febworms-edit-palette').length).toBe(1);
    });


    it('should render all field templates from config', function () {

      // Arrange

      febwormsConfigMock.fields.templates.push(new febworms.Field('Ein'));
      febwormsConfigMock.fields.templates.push(new febworms.Field('Zwein'));
      febwormsConfigMock.fields.templates.push(new febworms.Field('Drein'));

      var fieldCount = febwormsConfigMock.fields.templates.length;
      
      $fixture.append(template);
      var $element = $compile($fixture)($scope);

      // Act

      $scope.$digest();
      var result = $element.find('.febworms-field');

      // Assert

      expect(result.length).toBe(fieldCount);

      result.each(function () {
        var $overlay = $(this).find('.febworms-field-overlay');
        expect($overlay.length).toBe(1);
      });

    });

    it('should call the addField on button click', function () {

      // Arrange

      var field = new febworms.Field('foo');
      febwormsConfigMock.fields.templates.push(field);

      $fixture.append(template);
      var $element = $compile($fixture)($scope);

      $scope.$digest();

      $scope = $scope.$$childHead;

      schemaCtrl.addField = jasmine.createSpy('addField');

      // Act

      $element.find('.btn').first().click();

      // Assert

      // console.log(schemaCtrl.addField.calls);

      expect(schemaCtrl.addField).toHaveBeenCalled();
      expect(schemaCtrl.addField.calls[0].args[0]).toBeDefined();
      expect(schemaCtrl.addField.calls[0].args[0].type).toBeDefined('foo');
    });

    it('should only render fields of the selected category', function () {

      // Arrange

      // -- construct 2 fake templates

      var templates = febwormsConfigMock.fields.templates = [
        new febworms.Field('myType'), new febworms.Field('myOtherType')
      ];

      // -- create two categories and register each fake template

      var categories = febwormsConfigMock.fields.categories = {
        'myCategory': { 'myType': true },
        'myOtherCategory': { 'myOtherType': true }
      };

      // -- fake the template cache that we've got html entries

      _.forEach(templates, function (template) {
        var templateUrl = febwormsUtils.formatTemplateUrl(template.type);
        $templateCache.put(templateUrl, '<div class="render-result">' + template.type + '</div>')
      });

      // -- Set the initial selected category

      $scope.selectedCategory = categories['myCategory'];

      // -- Compile, link and grab the dom element

      $fixture.append(template);
      var $element = $compile($fixture)($scope);

      // Act

      // -- Swallow!

      $scope.$digest();

      var before = $element.find('.render-result').text();

      // -- Change the select category

      $scope.selectedCategory = categories['myOtherCategory'];

      // -- Swallow!

      $scope.$digest();

      var after = $element.find('.render-result').text();

      // Assert

      expect(before).not.toBe(after);
      expect(before).toBe('myType');
      expect(after).toBe('myOtherType');
    });
  });
});
