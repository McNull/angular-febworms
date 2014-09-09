angular.module('myApp').controller('FormDataIndexController', function ($scope, form, formDataItems, FormData, $window, notifications) {
  
  $scope.form = form;
  $scope.items = formDataItems; // FormData.query({ formId: $scope.formId });

  $scope.removeItem = function (item) {
    (function () {
      if ($window.confirm("Remove data from list?")) {
        item.$remove().then(function () {
          notifications.add("Data removed.", "warning");
          $scope.items = FormData.query({ formId: $scope.form.id });
        });
      }
    })();
  };
});