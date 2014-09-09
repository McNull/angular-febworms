describe('febworms-tabs-controller', function() {

  var $controller, $scope;

  beforeEach(function() {

    module('febworms');

    inject(function(_$controller_, _$rootScope_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();

    });

  });

  it('should construct controller', function() {

    var result = $controller('febwormsTabsController', {
      $scope: $scope
    });

    expect(result).toBeDefined();

  });

  describe('when adding panes', function() {


    it('should add pane to collection', function() {

      // Arrange

      var controller = $controller('febwormsTabsController', {
        $scope: $scope
      });

      var pane = {};

      // Act

      controller.addPane(pane);
      var result = _.indexOf(controller.panes, pane);

      // Assert

      expect(result).not.toBe(-1);
    });

    it('should set first pane active', function() {

      // Arrange

      var controller = $controller('febwormsTabsController', {
        $scope: $scope
      });

      var pane = {};

      // Act

      controller.addPane(pane);

      // Assert

      expect(pane.active).toBe(true);
    });

  }); // when adding panes

  describe('when setting a pane active', function() {
    
    it('should set pane active', function() {

      // Arrange

      var controller = $controller('febwormsTabsController', {
        $scope: $scope
      });

      for (var i = 0; i < 3; i++) {
        controller.addPane({});
      }

      var pane = {};

      // Act

      controller.addPane(pane);

      var before = pane.active;

      controller.active(pane);

      var after = pane.active;

      // Assert

      expect(before).toBeFalsy();
      expect(after).toBe(true);

    });

    it('should set other panes inactive', function() {

      // Arrange

      var controller = $controller('febwormsTabsController', {
        $scope: $scope
      });

      var otherPanes = [{}, {}, {}];
      
      angular.forEach(otherPanes, function(pane) {
        controller.addPane(pane);
      });

      var pane = {};
      controller.addPane(pane);

      // Act
      
      controller.active(pane);

      // Assert

      angular.forEach(otherPanes, function(pane) {
        expect(pane.active).toBeFalsy();
      });

    });

  }); // when setting a pane active
});