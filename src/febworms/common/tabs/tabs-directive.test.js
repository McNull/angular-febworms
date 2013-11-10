describe('febworms-tabs-directive', function() {

  var $compile, $scope;

  beforeEach(function() {

    module('febworms');

    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
    });

  });

  it('should compile template', function() {

    // Arrange

    var $element = angular.element('<div febworms-tabs></div>');

    // Act

    $compile($element)($scope);
    $scope.$digest();

    // Assert

    expect($element.find('.febworms-tabs').length).toBe(1);
  });

  describe('tab pane headers', function() {

    it('should add pane titles in headers', function() {
      // Arrange

      var $element = angular.element(
        '<div febworms-tabs>' +
          '<div febworms-tabs-pane="myFirstPane"></div>' +
          '<div febworms-tabs-pane="mySecondPane"></div>' +
        '</div>'
      );

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $li = $element.find('li');

      // Assert

      expect($li.length).toBe(2);
      expect($.trim($li[0].innerText)).toBe('myFirstPane');
      expect($.trim($li[1].innerText)).toBe('mySecondPane');
    });

    it('should add pane titles in headers', function() {
      // Arrange

      var $element = angular.element(
        '<div febworms-tabs>' +
          '<div febworms-tabs-pane="myFirstPane"></div>' +
          '<div febworms-tabs-pane="mySecondPane"></div>' +
        '</div>'
      );

      // Act

      $compile($element)($scope);
      $scope.$digest();

      var $li = $element.find('li');

      // Assert

      expect($li.length).toBe(2);
      expect($.trim($li[0].innerText)).toBe('myFirstPane');
      expect($.trim($li[1].innerText)).toBe('mySecondPane');
    });

    it('should set pane active on click', function() {
      // Arrange

      var $element = angular.element(
        '<div febworms-tabs>' +
          '<div febworms-tabs-pane="myFirstPane"></div>' +
          '<div febworms-tabs-pane="mySecondPane"></div>' +
        '</div>'
      );

      $compile($element)($scope);
      $scope.$digest();

      var $liFirst = $element.find('li:eq(0)');
      var $liSecond = $element.find('li:eq(1)');

      // Act

      $liSecond.find('a').click();
      // $scope.$digest(); // No digest needed?

      // Assert

      expect($liFirst.hasClass('active')).toBeFalsy();
      expect($liSecond.hasClass('active')).toBeTruthy();
    });

  }); // tab pane headers

});