describe('febworms-edit-canvas-directive', function() {

  var editCtrlMock = {}, $compile, $scope;

  beforeEach(function() {
    
    module('febworms');

    inject(function (_$compile_, _$rootScope_) {

      $compile = _$compile_;

      $scope = _$rootScope_.$new();
    
      // Needed for the require directive flag
      
      $element = angular.element('<div></div>');
      $element.data('$febwormsEditController', editCtrlMock);
      
    });

  });

  it('should compile directive', function() {

    // Arrange

    var template = '<div febworms-edit-canvas></div>';

    $element.append(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();
    var result = $element.find('.febworms-edit-canvas');

    // Assert

    expect(result.length).toBe(1);
  });

  it('should persist edit controller to scope', function() {

    // Arrange

    var template = '<div febworms-edit-canvas></div>';

    $element.append(template);
    $compile($element)($scope);
    $scope.$digest();
    
    // Act

    var $canvasScope = $element.find('.febworms-edit-canvas').scope();

    // Assert

    expect($canvasScope).toBeDefined();
    expect($canvasScope.editCtrl).toBeDefined();
    expect($canvasScope.editCtrl).toBe(editCtrlMock);

  });

  it('should create dummy form model on scope', function() {

    // Arrange

    var template = '<div febworms-edit-canvas></div>';

    $element.append(template);
    $compile($element)($scope);
    $scope.$digest();
    
    // Act

    var $canvasScope = $element.find('.febworms-edit-canvas').scope();

    // Assert

    expect($canvasScope).toBeDefined();
    expect($canvasScope.formModel).toBeDefined();
    
  });

});
