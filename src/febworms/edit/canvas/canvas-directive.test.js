describe('febworms-edit-canvas-directive', function() {

  var editCtrlMock = {}, schema = {}, schemaCtrlMock = {
    model: function() { return schema; }
  }, $compile, $scope;

  beforeEach(function() {
    
    module('febworms');

    inject(function (_$compile_, _$rootScope_) {

      $compile = _$compile_;

      $scope = _$rootScope_.$new();
      
      // This is not an isolated scope -- the directive requires
      // the scope controller to be set, which sets the schema property
      // on the scope.
      
      $scope.schema = schema;

      // Needed for the require directive flag
      
      $element = angular.element('<div></div>');
      $element.data('$febwormsEditController', editCtrlMock);
      $element.data('$febwormsSchemaController', schemaCtrlMock);
      
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

  it('should have schema on scope', function() {

    // Arrange

    var template = '<div febworms-edit-canvas></div>';

    $element.append(template);
    $compile($element)($scope);
    $scope.$digest();
    
    // Act

    var $canvasScope = $element.find('.febworms-edit-canvas').scope();

    // Assert

    expect($canvasScope).toBeDefined();
    expect($canvasScope.schema).toBeDefined();
  });

});
