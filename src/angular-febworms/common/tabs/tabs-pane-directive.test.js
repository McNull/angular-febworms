describe('febworms-tabs-pane-directive', function() {

  var linkFn, $scope, tabsCtrl, paneCtrl, ctrls, $element, $attrs, $compile;

  beforeEach(function() {
    module('febworms');

    $attrs = {
      $observe: angular.noop
    };

    tabsCtrl = {
      add: angular.noop
    };

    paneCtrl = {};

    ctrls = [tabsCtrl];

    inject(function(_febwormsTabsPaneLinkFn_, $rootScope, _$compile_) {
      linkFn = _febwormsTabsPaneLinkFn_;
      $compile = _$compile_;
      $scope = $rootScope.$new();
    });
  });


  describe('when linking the directive', function() {

    it('should create a pane property on the scope', function() {

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane).toBeDefined();

    });

    it('should add a default order value to the pane', function() {

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.order).toBeDefined();
      expect($scope.pane.order).toBe(10);

    });

    it('should add a the provided order value to the pane', function() {

      // Arrange

      $attrs.febwormsTabsPaneOrder = "100";

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.order).toBeDefined();
      expect($scope.pane.order).toBe(100);

    });

    it('should add auto activate property', function() {

      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.autoActive).toBeDefined();
      expect($scope.pane.autoActive).toBe(true);

    });

    it('should add provided auto activate property value', function() {

      // Arrange

      $attrs.febwormsTabsPaneAutoActive = "false";
      // Act

      linkFn($scope, $element, $attrs, [tabsCtrl]);

      // Assert

      expect($scope.pane.autoActive).toBeDefined();
      expect($scope.pane.autoActive).toBe(false);

    });


    it('should add the pane to the tabs controller', function() {

      // Arrange

      tabsCtrl.add = jasmine.createSpy('addPane');

      // Act

      linkFn($scope, $element, $attrs, ctrls);

      // Assert

      expect(tabsCtrl.add).toHaveBeenCalledWith($scope.pane);

    });


    it('should assign the title to the pane', function() {

      // Arrange

      var title = 'myTitle';
      $attrs.febwormsTabsPane = title;

      // Act


      linkFn($scope, $element, $attrs, ctrls);

      // Assert

      expect($scope.pane.title).toBe(title);

    });

  }); // when linking the attribute

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
//      var paneCtrl = $pane.controller('febwormsTabsPane');

      // Act

      tabsCtrl.active = null;
      $scope.$digest();

      var whenNotActive = $pane.hasClass('ng-hide');

      tabsCtrl.active = $pane.scope().pane;
      $scope.$digest();

      // console.log($fixture[0].outerHTML);

      var whenActive = $pane.hasClass('ng-hide')

      // Assert

      expect(whenNotActive).toBe(true); // has class ng-hide
      expect(whenActive).toBe(false);   // does not have class ng-hide

    });

  });


});