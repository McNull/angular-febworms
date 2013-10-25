describe('febworms-validation-summary', function() {

  var $compile, $scope, formField, schemaField, febwormsConfig, messages = {};

  // The febworms-validation-summary directive replaces the marked element and since it contains a ng-if attribute, the
  // first element will be a angular comment. By wrapping the template within a div we can easily locate the target UL
  // element: $element.find('ul')

  var template = '<div><div febworms-validation-summary data-form-field="formField" data-schema-field="schemaField" data-validation-messages="messages"></div></div>';

  beforeEach(function() {

    formField = {
      $invalid: true
    };

    schemaField = {};

    module('febworms');

    inject(function(_$compile_, _$rootScope_, _febwormsConfig_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

      febwormsConfig = _febwormsConfig_;

    });

    $scope.formField = formField;
    $scope.schemaField = schemaField;
    $scope.messages = messages;

  });

  it('should compile template', function() {

    // Act

    var $element = $compile(template)($scope);
    $scope.$digest();

    $element = $element.find('ul');
    var result = $element.hasClass('febworms-validation-summary');

    // Assert

    expect(result).toBe(true);
  });

  it('should display messages from config', function() {

    // Arrange

    febwormsConfig.validation.messages = {
      myError: 'This is my error message'
    };

    formField.$error = {
      myError: true
    };

    var $element = $compile(template)($scope);
    $scope.$digest();
    $element = $element.find('ul');

    // Act

    var result = $element.find('li').text();

    // Assert

    expect(result).toBe(febwormsConfig.validation.messages.myError);
  });

  it('should override config messages with provided messages', function() {

    // Arrange

    febwormsConfig.validation.messages = {
      myError: 'Message from config'
    };

    // messages is passed in the template with data-validation-messages
    messages.myError = 'Message from scope';

    formField.$error = {
      myError: true
    };

    var $element = $compile(template)($scope);
    $scope.$digest();
    $element = $element.find('ul');

    // Act

    var result = $element.find('li').text();

    // Assert

    expect(result).toBe(messages.myError);
  });
});
