describe('febworms-render-field-inner-directive', function() {

  var $compile, $templateCache, $scope, febwormsUtils;

  beforeEach(function() {

    module('febworms');

    inject(function(_$compile_, _$templateCache_, _$rootScope_, _febwormsUtils_) {

      $compile = _$compile_;
      $templateCache = _$templateCache_;
      $scope = _$rootScope_.$new();
      febwormsUtils = _febwormsUtils_;

    });
  });

  function createFieldTemplate(field, template) {
    field = field || new febworms.Field('fakeField');
    template = template || '<div> {{ field.type }} </div>';
    var templateUrl = febwormsUtils.formatTemplateUrl(field);
    $templateCache.put(templateUrl, template);

    return field;
  }

  it('should compile directive', function() {

    // Arrange

    $scope.field = createFieldTemplate();
    var template = '<div><div febworms-render-field-inner data-field="field"></div></div>';

    // Act

    var result = $compile(template)($scope);
    $scope.$digest();

    // Assert

    expect(result.find('.febworms-field-inner').length).toBe(1);
  });

  describe('tabIndex', function() {
    it('should default to "auto" tabIndex if none provided', function() {

      // Act

      $scope.field = createFieldTemplate();
      var template = '<div><div febworms-render-field-inner data-field="field"></div></div>';

      // Act

      var result = $compile(template)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.tabIndex).toBe('auto');

    });

    it('should use provided tabIndex value', function() {

      // Act

      $scope.field = createFieldTemplate();
      $scope.myAutoIndex = 123;
      var template = '<div><div febworms-render-field-inner data-field="field" data-tab-index="myAutoIndex"></div></div>';

      // Act

      var result = $compile(template)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.tabIndex).toBe($scope.$parent.myAutoIndex);

    });
  });

  describe('ngModel', function() {
    it('should use field schema value if no ngModel has been supplied', function() {

      // Act

      $scope.field = createFieldTemplate();
      $scope.field.value = 'My initial value';

      var template = '<div><div febworms-render-field-inner data-field="field"></div></div>';

      // Act

      var result = $compile(template)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.ngModel).toBe($scope.$parent.field.value);
    });

    it('should use supplied ngModel value', function() {

      // Act

      $scope.field = createFieldTemplate();
      $scope.myFieldData = "this is data";

      var template = '<div><div febworms-render-field-inner data-field="field" ng-model="myFieldData"></div></div>';

      // Act

      var result = $compile(template)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.ngModel).toBe($scope.$parent.myFieldData);
    });

  });
});