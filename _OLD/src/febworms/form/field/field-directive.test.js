describe('febworms-directive', function() {

  var $element, $compile, $templateCache, $scope, febwormsUtils, formCtrlMock;

  beforeEach(function() {

    formCtrlMock = {
      model: {
        data: {},
        schema: {},
        state: {}
      }
    };

    module('febworms');

    inject(function(_$compile_, _$templateCache_, _$rootScope_, _febwormsUtils_) {

      $compile = _$compile_;
      $templateCache = _$templateCache_;
      $scope = _$rootScope_.$new();
      febwormsUtils = _febwormsUtils_;

      // Needed for the require directive flag

      $element = angular.element('<div></div>');
      // $element.data('$formController', formCtrlMock);

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
    $element.append('<div febworms-field="fieldSchema"></div>');

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.find('.febworms-field-inner').length).toBe(1);
  });

  describe('renderInfo', function() {

    it('should assign renderInfo to scope', function() {
      
      // Arrange

      $scope.fieldSchema = createFieldTemplate();
      $element.append('<div febworms-field="fieldSchema"></div>');

      var fakeRenderInfo = {};
      spyOn(febwormsUtils, 'getRenderInfo').andCallFake(function() { return fakeRenderInfo; })
      $compile($element)($scope);

      // Act

      
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.renderInfo).toBeDefined();
      expect($scope.renderInfo).toBe(fakeRenderInfo);
      expect(febwormsUtils.getRenderInfo).toHaveBeenCalledWith($scope.fieldSchema);

    });

  });

  describe('febwormsFieldController.init', function() {

    var febwormsFieldLinkFn;

    beforeEach(function() {
      inject(function(_febwormsFieldLinkFn_) {
        febwormsFieldLinkFn = _febwormsFieldLinkFn_;
      });
    });

    it('should call febworms field controller init method', function() {
      
      // Arrange

      var febwormsFormCtrl = {};
      var febwormsFieldCtrl = {
        init: jasmine.createSpy('init')
      };

      var ctrls = [
        febwormsFormCtrl, febwormsFieldCtrl
      ];

      $scope.fieldSchema = createFieldTemplate();

      // Act

      febwormsFieldLinkFn($scope, $element, null, ctrls);

      // Assert

      expect(febwormsFieldCtrl.init).toHaveBeenCalled();
    });

  });

  describe('tabIndex', function() {
    it('should default to "auto" tabIndex if none provided', function() {

      // Act

      $scope.fieldSchema = createFieldTemplate();
      $element.append('<div febworms-field="fieldSchema"></div>');

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

      $element.append('<div febworms-field="fieldSchema" febworms-tab-index="myAutoIndex"></div>');

      // Act

      var result = $compile($element)($scope);
      $scope.$digest();
      $scope = $scope.$$childHead;

      // Assert

      expect($scope.tabIndex).toBe($scope.$parent.myAutoIndex);

    });
  });
  
});