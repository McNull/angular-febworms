describe('febworms-form-directive', function() {

  beforeEach(function() {
    module('febworms');
  })

  describe('febwormsFormCompileFn', function() {

    var febwormsFormCompileFn;

    beforeEach(function() {
      inject(function(_febwormsFormCompileFn_) {
        febwormsFormCompileFn = _febwormsFormCompileFn_;
      });
    });

    it('should append render element', function() {

      // Arrange

      var $element = angular.element('<div></div>');
      var $attrs = {};

      // Act

      febwormsFormCompileFn($element, $attrs);

      // Assert

      expect($element.children().length).toBe(1);
      expect($element.children().attr('febworms-render')).toBeDefined();
    });

    it('should NOT append render element if specified', function() {

      // Arrange

      var $element = angular.element('<div></div>');
      var $attrs = { 
        febwormsNoRender: true
      };

      // Act

      febwormsFormCompileFn($element, $attrs);

      // Assert

      expect($element.children().length).toBe(0);
    });
  });

  describe('febwormsFormLinkFn', function() {

    var febwormsFormLinkFn, $scope, $element, $attrs;
    
    var ngFormCtrl = {};
    var formCtrl = {};
    var schemaCtrl = {
      _model: null,
      model: function() { return this._model; }
    };

    var ctrls = [ngFormCtrl, formCtrl, schemaCtrl];

    beforeEach(function() {
      inject(function(_febwormsFormLinkFn_) {
        febwormsFormLinkFn = _febwormsFormLinkFn_;
      });

      inject(function(_$rootScope_) {
        $scope = _$rootScope_.$new();
      });
    });

    describe('updateFormModel', function() {

      it('should call updateFormModel on the form controller before digest', function() {

        // Arrange

        formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');

        // Act

        febwormsFormLinkFn($scope, $element, $attrs, ctrls);

        // Assert

        expect(formCtrl.updateFormModel).toHaveBeenCalledWith(ngFormCtrl);
      });

      it('should NOT call updateFormModel on every digest', function() {

        // Arrange

        var expectedCallCount = 2; 

        formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
        febwormsFormLinkFn($scope, $element, $attrs, ctrls); // + 1
        $scope.$digest(); // + 1

        // Act

        $scope.$digest(); // Should not do anything

        // Assert

        expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      });

      it('should call updateFormModel whenever the schema model has been changed', function() {

        // Arrange

        var expectedCallCount = 3; 

        formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
        febwormsFormLinkFn($scope, $element, $attrs, ctrls); // + 1
        $scope.$digest(); // + 1

        // Act

        schemaCtrl._model = {};
        $scope.$digest(); // + 1

        // Assert

        expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      });

      it('should call updateFormModel whenever form property has changed', function() {

        // Arrange

        var expectedCallCount = 4; 

        formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
        febwormsFormLinkFn($scope, $element, $attrs, ctrls); // + 1
        $scope.$digest(); // + 1

        // Act

        $scope.form = {};
        $scope.$digest(); // + 2 (called twice because of form update)

        // Assert

        expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      });

      it('should call updateFormModel whenever formData property has changed', function() {

        // Arrange

        var expectedCallCount = 3; 

        formCtrl.updateFormModel = jasmine.createSpy('updateFormModel');
        febwormsFormLinkFn($scope, $element, $attrs, ctrls); // + 1
        $scope.$digest(); // + 1

        // Act

        $scope.formData = {};
        $scope.$digest(); // + 1

        // Assert

        expect(formCtrl.updateFormModel.calls.length).toBe(expectedCallCount);
      });

    });
  });
});