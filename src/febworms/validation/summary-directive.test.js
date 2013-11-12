describe('febworms-validation-summary', function() {

  var $scope, febwormsConfig;

  beforeEach(function() {
    module('febworms');

    febwormsConfig = {
      validation: {
        messages: {}
      }
    };

    module(function($provide) {
      $provide.constant('febwormsConfig', febwormsConfig);
    });

    inject(function(_$rootScope_) {
      $scope = _$rootScope_.$new();
    });
  });

  describe('template', function() {

    var $compile;

    beforeEach(function() {

      inject(function(_$compile_) {
        $compile = _$compile_;
      });

    });

    function runTests(setup) {

      it('should compile template', function() {

        // Arrange

        $compile(setup.$fixture)($scope);

        // Act

        $scope.$digest();

        // Assert

        expect(setup.$fixture.find('.febworms-validation-summary').length).toBe(1);
      });

      it('should display error message', function() {

        // Arrange

        febwormsConfig.validation.messages.myTerribleError = 'my terrible error message';
        setup.field.state.$error = {
          myTerribleError: true
        };

        $compile(setup.$fixture)($scope);

        // Act

        $scope.$digest();
        var result = setup.$fixture.find('li');

        // Assert

        expect(result.length).toBe(1);
        expect(result.text()).toBe(febwormsConfig.validation.messages.myTerribleError);
      });

      it('should display multiple error messages', function() {

        // Arrange

        febwormsConfig.validation.messages.myTerribleError = 'my terrible error message';
        febwormsConfig.validation.messages.myScareUserError = 'you did make a backup, right?';

        setup.field.state.$error = {
          myTerribleError: true,
          myScareUserError: true
        };

        $compile(setup.$fixture)($scope);

        // Act

        $scope.$digest();
        var result = setup.$fixture.find('li');

        // Assert

        expect(result.length).toBe(2);
        expect(result.text().indexOf(febwormsConfig.validation.messages.myTerribleError)).not.toBe(-1);
        expect(result.text().indexOf(febwormsConfig.validation.messages.myScareUserError)).not.toBe(-1);
      });

      it('should allow expressions in messages', function() {

        // Arrange

        febwormsConfig.validation.messages.myExpression = "{{ 1 + 2 }}";

        setup.field.state.$error = {
          myExpression: true
        };

        $compile(setup.$fixture)($scope);

        // Act

        $scope.$digest();
        var result = setup.$fixture.find('li');

        // Assert

        expect(result.length).toBe(1);
        expect(result.text()).toBe('3');
      });
    }

    describe('when field controller is available', function() {

      var setup = {};

      beforeEach(function() {

        setup.field = {
          name: 'myField',
          state: {
            $invalid: true,
            $dirty: true
          }
        };

        setup.fieldCtrl = {
          field: function() {
            return setup.field;
          }
        };

        setup.$fixture = angular.element('<div><div febworms-validation-summary></div></div>');
        setup.$fixture.data('$febwormsFieldController', setup.fieldCtrl);

      });

      runTests(setup);


    });

    describe('when form controller is available', function() {

      var setup = {};

      beforeEach(function() {

        setup.field = {
          name: 'myField',
          state: {
            $invalid: true,
            $dirty: true
          }
        };

        setup.formCtrl = {
          myField: setup.field.state
        };

        setup.$fixture = angular.element('<div><div febworms-validation-summary="myField"></div></div>');
        setup.$fixture.data('$formController', setup.formCtrl);

      });

      runTests(setup);

    });

  });

  describe('febwormsValidationSummaryLinkFn', function() {

    var febwormsValidationSummaryLinkFn, $element, $attrs;

    beforeEach(function() {
      inject(function(_febwormsValidationSummaryLinkFn_) {
        febwormsValidationSummaryLinkFn = _febwormsValidationSummaryLinkFn_;
      });
    });

    describe('when field controller is available', function() {

      it('should assign field model from field controller to scope', function() {

        // Arrange

        var field = {};
        var fieldCtrl = {
          field: function() {
            return field;
          }
        };

        var ctrls = [
          fieldCtrl
        ];

        // Act

        febwormsValidationSummaryLinkFn($scope, $element, $attrs, ctrls);

        // Assert

        expect($scope.field).toBe(field);

      });

    }); // when field controller is available

    describe('when no field controller is available', function() {

      it('should create field model and get state from ngForm controller', function() {

        // Arrange

        var fieldCtrl = undefined; // It overrules the ngFormCtrl

        var ngFormCtrl = {
          myField: {}
        };

        $scope.fieldName = "myField";

        var ctrls = [
          fieldCtrl,
          ngFormCtrl
        ];

        // Act

        febwormsValidationSummaryLinkFn($scope, $element, $attrs, ctrls);
        $scope.$digest();

        // Assert

        expect($scope.field).toBeDefined();
        expect($scope.field.name).toBe($scope.fieldName);
        expect($scope.field.state).toBe(ngFormCtrl.myField);

      });

    }); // when no field controller is available

    describe('messages', function() {

      it('should use messages from the configuration', function() {

        // Arrange

        var field = {};
        var fieldCtrl = {
          field: function() {
            return field;
          }
        };

        var ctrls = [fieldCtrl];

        febwormsConfig.validation.messages.myMessage = 'Should be there';

        // Act

        febwormsValidationSummaryLinkFn($scope, $element, $attrs, ctrls);

        // Assert

        expect($scope.messages).toBeDefined();
        expect($scope.messages.myMessage).toBe(febwormsConfig.validation.messages.myMessage);
      });

      it('should merge provided messages', function() {

        // Arrange

        var field = {};
        var fieldCtrl = {
          field: function() {
            return field;
          }
        };

        var ctrls = [fieldCtrl];

        febwormsConfig.validation.messages.myMessage = 'Should be there';
        febwormsConfig.validation.messages.mySecondMessage = 'Should be overruled ...';

        $scope.validationMessages = {
          mySecondMessage: '... with this one.'
        };

        // Act

        febwormsValidationSummaryLinkFn($scope, $element, $attrs, ctrls);

        // Assert

        expect($scope.messages).toBeDefined();
        expect($scope.messages.myMessage).toBe(febwormsConfig.validation.messages.myMessage);
        expect($scope.messages.mySecondMessage).toBe($scope.validationMessages.mySecondMessage);
      });

    }); // messages

  }); // febwormsValidationSummaryLinkFn

});