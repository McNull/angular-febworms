describe('febworms palette controller', function() {

  beforeEach(module('febworms'));

  var $controller, $scope, febwormsConfig;

  beforeEach(inject(function(_$controller_, _$rootScope_, _febwormsConfig_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    febwormsConfig = _febwormsConfig_;
  }));

  it('should assign fields config to scope', function() {

    // Act

    $controller('febwormsPaletteController', {
      $scope: $scope,
      febwormsConfig: febwormsConfig
    });

    // Assert

    expect($scope.fields).toBe(febwormsConfig.fields);
  });
});
