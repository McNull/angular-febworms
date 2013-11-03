describe('febworms-render-field-inner-directive', function() {

  var $element, $compile, $templateCache, $scope, febwormsUtils, formModel = {}, formCtrlMock = {};

  beforeEach(function() {

    module('febworms');

    inject(function(_$compile_, _$templateCache_, _$rootScope_, _febwormsUtils_) {

      $compile = _$compile_;
      $templateCache = _$templateCache_;
      $scope = _$rootScope_.$new();
      febwormsUtils = _febwormsUtils_;

      $scope.formModel = formModel;


      // Needed for the require directive flag
      
      $element = angular.element('<div></div>');
      $element.data('$formController', formCtrlMock);

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

    $scope.fieldSchema = createFieldTemplate();
    $element.append('<div><div febworms-render-field-inner data-form-model="formModel" data-field-schema="fieldSchema"></div></div>');

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.find('.febworms-field-inner').length).toBe(1);
  });

  describe('tabIndex', function() {
    it('should default to "auto" tabIndex if none provided', function() {

      // Act

      $scope.fieldSchema = createFieldTemplate();
      $element.append('<div><div febworms-render-field-inner data-form-model="formModel" data-field-schema="fieldSchema"></div></div>');

      // Act

      var result = $compile($element)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.tabIndex).toBe('auto');

    });

    it('should use provided tabIndex value', function() {

      // Act

      $scope.myAutoIndex = 123;
      $scope.fieldSchema = createFieldTemplate();
      
      $element.append('<div><div febworms-render-field-inner data-form-model="formModel" data-field-schema="fieldSchema" data-tab-index="myAutoIndex"></div></div>');

      // Act

      var result = $compile($element)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.tabIndex).toBe($scope.$parent.myAutoIndex);

    });
  });

  describe('form model', function() {
    it('should use field schema value if form model does not contain a value', function() {

      // Act

      $scope.fieldSchema = createFieldTemplate();
      $scope.fieldSchema.value = 'My initial value';
      
      $element.append('<div><div febworms-render-field-inner data-form-model="formModel" data-field-schema="fieldSchema"></div></div>');

      // Act

      var result = $compile($element)($scope);
      $scope.$digest();
      
      // Assert

      expect($scope.formModel[$scope.fieldSchema.name]).toBeDefined();
      expect($scope.formModel[$scope.fieldSchema.name]).toBe($scope.fieldSchema.value);
    });

    it('should use supplied form model value', function() {

      // Act

      $scope.fieldSchema = createFieldTemplate();
      $scope.fieldSchema.value = 'My initial value';

      var formModelValue = 'My form model value';

      $scope.formModel[$scope.fieldSchema.name] = formModelValue;
      
      $element.append('<div><div febworms-render-field-inner data-form-model="formModel" data-field-schema="fieldSchema"></div></div>');

      // Act

      var result = $compile($element)($scope);
      $scope.$digest();
      
      // Assert

      expect($scope.formModel[$scope.fieldSchema.name]).toBe(formModelValue);
    });

    it('should copy the field.value to the ngModel when in edit mode', function() {

      // Act

      $scope.fieldSchema = createFieldTemplate();
      $element.append('<div><div febworms-render-field-inner data-form-model="formModel" data-field-schema="fieldSchema" data-edit-mode="true"></div></div>');

      $compile($element)($scope);
      $scope.$digest();

      // Act

      $scope.fieldSchema.value = "should be copied to model";
      $scope.$digest();

      // Assert

      expect($scope.formModel[$scope.fieldSchema.name]).toBeDefined();
      expect($scope.formModel[$scope.fieldSchema.name]).toBe($scope.fieldSchema.value);
    });
  });
});