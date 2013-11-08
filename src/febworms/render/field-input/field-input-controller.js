angular.module('febworms').controller('febwormsFieldInputController', function($scope) {
  
  var self = this;
  this.model = {};
  
  this.init = function(fieldSchema, ngModelCtrl) {
    
    self.model.schema = fieldSchema;
    self.model.state = ngModelCtrl;
    
    return self.model;
  };
  
});