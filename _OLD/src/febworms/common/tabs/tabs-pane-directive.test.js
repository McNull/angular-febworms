describe('febworms-tabs-pane-directive', function() {

  var linkFn, $scope, tabsCtrl, paneCtrl, ctrls, $element, $attrs, $compile;

  beforeEach(function() {
    module('febworms');

    $attrs = {
      $observe: angular.noop
    };

    tabsCtrl = {
      addPane: angular.noop
    };

    paneCtrl = {};

    ctrls = [paneCtrl, tabsCtrl];

    inject(function(_febwormsTabsPaneLinkFn_, $rootScope, _$compile_) {
      linkFn = _febwormsTabsPaneLinkFn_;
      $compile = _$compile_;
      $scope = $rootScope.$new();
    });
  });

  describe('when compiling the template', function() {

    it('should compile', function() {
      
      // Arrange

      var $fixture = angular.element('<div></div>');
      $fixture.data('$febwormsTabsController', tabsCtrl);

      $fixture.append('<div febworms-tabs-pane="myPane"></div>');

      // Act

      $compile($fixture)($scope);
      $scope.$digest();

      // Assert

      expect($fixture.find('.febworms-tabs-pane').length).toBe(1);
      
    });

    it('should only be visible when active', function() {
      
      // Arrange

      var $fixture = angular.element('<div></div>');
      $fixture.data('$febwormsTabsController', tabsCtrl);

      $fixture.append('<div febworms-tabs-pane="myPane"></div>');

      $compile($fixture)($scope);
      $scope.$digest();

      var $pane = $fixture.find('.febworms-tabs-pane');
      var paneCtrl = $pane.controller('febwormsTabsPane');

      // Act

      paneCtrl.active = false;
      $scope.$digest();

      var whenNotActive = $pane.hasClass('ng-hide');

      paneCtrl.active = true;
      $scope.$digest();

      // console.log($fixture[0].outerHTML);

      var whenActive = $pane.hasClass('ng-hide')

      // Assert

      expect(whenNotActive).toBe(true); // has class ng-hide
      expect(whenActive).toBe(false);   // does not have class ng-hide

    });
    
  });

  describe('when linking the directive', function() {


    it('should add the pane to the tabs controller', function() {

      // Arrange

      tabsCtrl.addPane = jasmine.createSpy('addPane');

      // Act

      linkFn($scope, $element, $attrs, ctrls);

      // Assert

      expect(tabsCtrl.addPane).toHaveBeenCalledWith(paneCtrl);

    });

    it('should expose the pane controller on scope', function() {

      // Arrange

      // Act

      linkFn($scope, $element, $attrs, ctrls);

      // Assert

      expect($scope.$_paneCtrl).toBe(paneCtrl);

    });

    it('should assign the title to the pane', function() {

      // Arrange

      var title = 'myTitle';

      $attrs.$observe = function(name, fn) {
        if (name === 'febwormsTabsPane') {
          fn(title);
        }
      };

      // Act

      linkFn($scope, $element, $attrs, ctrls);

      // Assert

      expect(paneCtrl.title).toBe(title);

    });

  }); // when linking the attribute
});