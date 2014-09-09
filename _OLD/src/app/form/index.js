angular.module('myApp').controller('FormIndexController', function ($scope, Form, $window, notifications) {
  $scope.items = Form.query();

  $scope.removeItem = function (item) {
    var name = item.schema.name;

    (function (name) {
      if ($window.confirm("Remove schema '" + name + "' from list?")) {
        item.$remove().then(function () {
          notifications.add("Schema '" + name + "' has been removed.", "warning");
          $scope.items = Form.query();
        });
      }
    })(name);
  };
});