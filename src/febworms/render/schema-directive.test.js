describe('febworms-schema-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('febworms'); 

    inject(function(_$rootScope_, _$compile_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();
      
    });

  });

  it('should compile directive', function() {

    // Arrange

    var template = '<div febworms-schema="schema"></div>';

    var $fixture = angular.element(template);
    //$fixture.data('$febwormsSchemaController', schemaCtrlMock);

    // Act

    $compile($fixture)($scope);
    $scope.$digest();

    // Assert
    
    expect($fixture.hasClass('ng-scope')).toBe(true);

  });

});