
angular.module('myApp').factory('notifications', function() {

  var messages = [];

  function add(text, type) {
    messages.push({
      text: text,
      type: type || 'info'
    });
  }

  function remove(message) {
    _.remove(messages, message);
  }

  function clear() {
    messages.length = 0;
  }

  return {
    add: add,
    remove: remove,
    clear: clear,
    messages: messages
  };
});

angular.module('myApp').config(function($provide) {
  $provide.decorator("$exceptionHandler", function($delegate, notifications) {
    return function(exception, cause) {
      $delegate(exception, cause);
      notifications.add(exception.toString(), 'error');
    };
  });
});

angular.module('myApp').controller('NotificationsController', function($scope, notifications) {
  $scope.notifications = notifications;
});

angular.module('myApp').directive('notifications', function() {

  return {
    templateUrl: 'app/notifications/notifications.tmpl.html',
    controller: 'NotificationsController',
    restrict: 'AEC',
    replace: true
  };
});

'use strict';

angular.module('myApp').factory('errorHttpInterceptor', function ($q, notifications) {

  function displayError(message) {
    notifications.add(message, 'error');
  }

  return function (promise) {
    return promise.then(function (response) {
      return response;
    }, function (response) {

      var msg = 'Network error (' + response.status + '): ' + response.data;

      notifications.add(msg, 'error');

      return $q.reject(response);
    });
  };
});

if(!window.jasmine) {
  angular.module('myApp').config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('errorHttpInterceptor');
  });
}