angular.module('febworms').controller('febwormsFormController', function($scope, $parse) {

  this.model = {};
  var self = this;

  this.init = function(dataExpression, schema, state) {
    // Called by the directive
    
    var dataGetter = $parse(dataExpression);
    var dataSetter = dataGetter.assign;

    $scope.$watch(dataGetter, function(value) {
      if(value === undefined) {
        value = {};

        if(dataSetter) {
          dataSetter($scope, value);
        }
      }

      self.model.data = value;
    });

    $scope.$watch(function() {
      return schema.model();
    }, function(value) {
      if(value === undefined) {
        schema.model({});
      } else {
        self.model.schema = value;
      }
    });

    self.model.state = state;

    
    return self.model;
  };
  
});
