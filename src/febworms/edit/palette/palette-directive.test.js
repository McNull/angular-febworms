describe('febworms-edit-palette', function () {

  var $controller, $scope, febwormsConfigMock, $compile, $templateCache, febwormsUtils;

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
  });

  describe('directive', function () {

    var template = '<div febworms-edit-palette></div>';

    it('should compile the template', function () {

      // Arrange

      var element = angular.element(template);

      // Act

      var result = $compile(element)($scope);
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
      var $element = $compile($(template))($scope);

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

      var $element = $compile($(template))($scope);
      $scope.$digest();

      $scope = $scope.$$childHead;

      spyOn($scope, 'addField');

      // Act

      $element.find('.btn').first().click();

      // Assert

      expect($scope.addField).toHaveBeenCalled();
      expect($scope.addField.calls[0].args[0]).toBeDefined();
      expect($scope.addField.calls[0].args[0].field).toBeDefined();
      expect($scope.addField.calls[0].args[0].field.type).toBe('foo');
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

      var $element = $compile($(template))($scope);

      // -- Change scope to isolated child scope

      $scope = $scope.$$childHead;

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
