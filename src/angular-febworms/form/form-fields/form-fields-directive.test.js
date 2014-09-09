describe('febworms-form-fields-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('febworms');

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
    });
  });

  it('should render the directive', function() {

    // Arrange

    var form = {
      schema: {}
    };
    
    $scope.form = form;

    var $element = angular.element('<div><div febworms-form-fields></div></div>');
    $element.data('$febwormsFormController', {});

    // Act

    var result = $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(result.find('.febworms-form-fields').length).toBe(1);
  });

});