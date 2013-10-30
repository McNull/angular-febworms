describe('febworms-edit-meta-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('febworms');

    inject(function(_$compile_, _$rootScope_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

    });

  });

  it('should compile directive', function() {

    // Arrange

    var template = '<div febworms-edit-meta></div>';
    var $element = angular.element(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();

    var result = $element.find('form');

    // Assert

    expect(result.hasClass('febworms-edit-meta')).toBe(true);
  });

  it('should expose the form via callback', function() {

    // Arrange

    $scope.exposeForm = jasmine.createSpy('exposeForm');
    var template = '<div febworms-edit-meta data-expose-form="exposeForm(form)"></div>';
    var $element = angular.element(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($scope.exposeForm).toHaveBeenCalled();
    expect($scope.exposeForm.calls[0].args[0].constructor.name).toBe('FormController');
  });

});