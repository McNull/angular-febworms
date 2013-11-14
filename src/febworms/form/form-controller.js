angular.module('febworms').controller('febwormsFormController', function($scope) {

  var self = this;
  this.model = {};

  this.updateFormModel = function(data, schema, state) {
    // Called by the directive
    
    self.model.data = data || {};
    self.model.schema = schema || {};
    self.model.state = state;
    
    return self.model;
  };
  
});
