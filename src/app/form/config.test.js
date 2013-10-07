
describe('formRoutes', function() {

  it('should match route configuration', function() {

    module('myApp');

    function FormMock() {}
    FormMock.get = function() { return {}; };

    module(function($provide) {
      $provide.value('Form', FormMock);
    });

    inject(function($route, $location, $rootScope, formRoutes) {
      angular.forEach(formRoutes, function (routeData, path) {

        $location.path(path);
        $rootScope.$digest();

        expect($route.current.templateUrl).toBe(routeData.templateUrl);
        expect($route.current.controller).toBe(routeData.controller);
      });
    });
  });
});
