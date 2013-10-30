describe('febworms-edit-palette-categories-directive', function() {

  var $scope, $controller, febwormsConfig;

  beforeEach(function() {

    module('febworms');

    inject(function(_$rootScope_, _$controller_, _febwormsConfig_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      febwormsConfig = _febwormsConfig_;

    });

  });

  it('should use category list from configuration', function() {

    // Act

    $controller('febwormsEditPaletteCategoriesController', {
      $scope: $scope,
      febwormsConfig: febwormsConfig
    });

    // Assert

    expect($scope.categories).toBe(febwormsConfig.fields.categories);

  });

  it('should set first category active on init', function() {

    // Arrange

    febwormsConfig.fields.categories = {
      'Should be active': { active: true },
      'Should not be active': { active: false }
    };

    // Act

    $controller('febwormsEditPaletteCategoriesController', {
      $scope: $scope,
      febwormsConfig: febwormsConfig
    });

    // Assert

    expect($scope.categoryName).toBe('Should be active');
    expect($scope.category).toBe(febwormsConfig.fields.categories['Should be active']);

  });

  it('should change both category object and name', function() {

    // Arrange

    var categoryName = 'The new category';
    var category = {
      totalyNew: true
    };

    $controller('febwormsEditPaletteCategoriesController', {
      $scope: $scope,
      febwormsConfig: febwormsConfig
    });

    // Act

    $scope.setCategory(categoryName, category);

    // Assert

    expect($scope.categoryName).toBe(categoryName);
    expect($scope.category).toBe(category);

  });
});