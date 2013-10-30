describe('febworms-edit-palette', function () {

  var $controller, $scope, febwormsConfigMock, $compile, $templateCache;
return;
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


    it('should call the field init for each field template', function () {
      // Arrange

      $scope.initField = angular.noop;
      spyOn($scope, 'initField');

      febwormsConfigMock.fields.templates.push(new febworms.Field('Ein'));
      febwormsConfigMock.fields.templates.push(new febworms.Field('Zwein'));
      febwormsConfigMock.fields.templates.push(new febworms.Field('Drein'));

      var fieldCount = febwormsConfigMock.fields.templates.length;
      var $element = $compile($(template))($scope);

      // Act

      $scope.$digest();

      // Assert

      expect($scope.initField.calls.length).toBe(fieldCount);
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

    //    it('should call the addFieldToSchema on overlay double click', function () {
    //
    //      // Arrange
    //
    //      var field = new febworms.Field('foo');
    //      febwormsConfigMock.fields.templates.push(field);
    //
    //      $scope.addFieldToSchema = angular.noop;
    //      spyOn($scope, 'addFieldToSchema');
    //
    //      var $element = $compile($(template))($scope);
    //      $scope.$digest();
    //
    //      // Act
    //
    //      var $fieldOverlay = $element.find('.febworms-field-overlay').first();
    //      $fieldOverlay.dblclick();
    //
    //      // Assert
    //
    //      expect($scope.addFieldToSchema).toHaveBeenCalledWith(field);
    //    });

    it('should call the addFieldToSchema on button click', function () {

      // Arrange

      var field = new febworms.Field('foo');
      febwormsConfigMock.fields.templates.push(field);

      $scope.addFieldToSchema = angular.noop;
      spyOn($scope, 'addFieldToSchema');

      var $element = $compile($(template))($scope);
      $scope.$digest();

      // Act

      $element.find('.btn').first().click();

      // Assert

      expect($scope.addFieldToSchema).toHaveBeenCalledWith(field);
    });

    it('should only render fields of the selected category', function () {

      // Arrange

      febwormsConfigMock.fields.templates = [
        new febworms.Field('myType'), new febworms.Field('myOtherType')
      ];

      febwormsConfigMock.fields.categories = {
        'myCategory': ['myType'],
        'myOtherCategory': ['myOtherType']
      };

      _.forEach(febwormsConfigMock.fields.templates, function (field) {
        $templateCache.put('template-' + field.type + '.tmpl.html', '<div class="render-result">' + field.type + '</div>')
      });

      $scope.initField = function (field) {
        field.$_templateUrl = { palette: 'template-' + field.type + '.tmpl.html' };
      };

      var $element = $compile($(template))($scope);
      $scope.$digest();

      // Act

      var before = $element.find('.render-result').text();

      $scope.palette.categoryKey = 'myOtherCategory';
      $scope.$digest();

      var after = $element.find('.render-result').text();

      // Assert

      expect(before).not.toBe(after);
      expect(before).toBe('myType');
      expect(after).toBe('myOtherType');
    });
  });
});
