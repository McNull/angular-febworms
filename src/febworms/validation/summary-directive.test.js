describe('febworms-validation-summary', function() {

  var $fixture, $compile, $scope, fieldState, fieldSchema, febwormsConfig, messages = {}, formCtrlMock = {};

  // The febworms-validation-summary directive replaces the marked element and since it contains a ng-if attribute, the
  // first element will be a angular comment. By wrapping the template within a div we can easily locate the target UL
  // element: $element.find('ul')

  var template = '<div><div febworms-validation-summary data-field-state="fieldState" data-field-schema="fieldSchema" data-validation-messages="messages"></div></div>';

  beforeEach(function() {

    fieldState = {
      $invalid: true
    };

    fieldSchema = new febworms.Field('myType');

    module('febworms');

    inject(function(_$compile_, _$rootScope_, _febwormsConfig_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

      febwormsConfig = _febwormsConfig_;

    });

    $scope.fieldState = fieldState;
    $scope.fieldSchema = fieldSchema;
    $scope.messages = messages;

    // Needed by require flag in directive

    $fixture = angular.element('<div></div>');
    $fixture.data('$formController', formCtrlMock);

  });

  it('should compile template', function() {

    // Arrange

    $fixture.append(template);

    // Act

    $compile($fixture)($scope);
    $scope.$digest();

    
    var result = $fixture.find('ul').hasClass('febworms-validation-summary');

    // Assert

    expect(result).toBe(true);
  });

  it('should display messages from config', function() {

    // Arrange

    febwormsConfig.validation.messages = {
      myError: 'This is my error message'
    };

    fieldState.$error = {
      myError: true
    };

    $fixture.append(template);
    $compile($fixture)($scope);

    $scope.$digest();

    // Act

    var result = $fixture.find('li').text();

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

    fieldState.$error = {
      myError: true
    };

    $fixture.append(template);
    $compile($fixture)($scope);

    $scope.$digest();

    // Act

    var result = $fixture.find('li').text();

    // Assert

    expect(result).toBe(messages.myError);
  });

  it('should locate field state on form controller if none provided', function() {

    // Arrange

    formCtrlMock[fieldSchema.name] = fieldState;
    $fixture.append('<div febworms-validation-summary data-field-schema="fieldSchema"></div>');
    $compile($fixture)($scope);

    // Act

    $scope.$digest();
    var $resultScope = $fixture.find('.ng-scope').scope();
   
    // Assert

    expect($resultScope).toBeDefined();
    expect($resultScope.fieldState).toBe(fieldState);

  });

  it('should locate field state by name on form controller if none provided', function() {

    // Arrange

    formCtrlMock[fieldSchema.name] = fieldState;
    $fixture.append('<div febworms-validation-summary data-field-name="{{ fieldSchema.name }}"></div>');
    $compile($fixture)($scope);

    // Act

    $scope.$digest();
    var $resultScope = $fixture.find('.ng-scope').scope();
   
    // Assert

    expect($resultScope).toBeDefined();
    expect($resultScope.fieldState).toBe(fieldState);

  });
});
