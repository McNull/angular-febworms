describe('febworms-edit-meta-directive', function() {

  var $compile, $scope, $fixture, schema = {}, editCtrl = {
    setMetaForm: function() {}
  }, schemaCtrl = {
    model: function() {
      return schema;
    }
  };

  beforeEach(function() {

    module('febworms');

    inject(function(_$compile_, _$rootScope_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

      // Directive is not an isolated scope.
      
      $scope.schema = schema;
    });

    $fixture = angular.element('<div></div>');
    $fixture.data('$febwormsEditController', editCtrl);
    $fixture.data('$febwormsSchemaController', schemaCtrl);

  });

  it('should compile directive', function() {

    // Arrange

    var template =
      //'<div febworms-edit>' +
        '<div febworms-edit-meta></div>';
      //'</div>';
    var $element = $fixture.append(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();

    var result = $element.find('form');

    // Assert

    expect(result.hasClass('febworms-edit-meta')).toBe(true);
  });

  it('should have schema on scope', function() {
    // Arrange

    var template =
      //'<div febworms-edit>' +
        '<div febworms-edit-meta></div>';
      //'</div>';
    var $element = $fixture.append(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();

    $scope = $element.find('form').scope();

    // Assert

    expect($scope.schema).toBe(schema);
  });

  // it('should expose edit ctrl on scope', function() {

  //   // Arrange

  //   var template =
      
  //       '<div febworms-edit-meta></div>';
      
  //   var $element = $fixture.append(template);

  //   // Act

  //   $compile($element)($scope);
  //   $scope.$digest();

 
  //   $scope = $element.find('form').scope();

  //   // Assert

  //   expect($scope.editCtrl).toBe(editCtrl);
  // });


  it('should expose form to the edit controller', function() {

    // Arrange

    editCtrl.setMetaForm = jasmine.createSpy('setMetaForm');

    var template =
    //  '<div febworms-edit>' +
        '<div febworms-edit-meta></div>';
    //  '</div>';

    var $element = $fixture.append(template);

    // Act

    $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect(editCtrl.setMetaForm).toHaveBeenCalled();
    expect(editCtrl.setMetaForm.calls[0].args[0].constructor.name).toBe('FormController');
  });

});