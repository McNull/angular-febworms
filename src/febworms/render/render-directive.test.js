describe('febworms-render-directive', function() {

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

    var template = '<div><div febworms-render febworms-schema="form.schema"></div></div>';

    // Act

    var result = $compile(template)($scope);
    $scope.$digest();

    // Assert

    expect(result.find('.febworms-render').length).toBe(1);
  });


  describe('$scope.model', function() {

    it('should create model if none is provided', function() {

      // Arrange

      var form = {
        schema: {}
      };

      $scope.form = form;

      var template = '<div><div febworms-render febworms-schema="form.schema" febworms-form-data="form.data"></div></div>';
      $compile(template)($scope);

      // Act

      $scope.$digest();

      // Assert

      expect(form.data).toBeDefined();

    });

  });

});