angular.module('febworms').controller('febwormsTabsController', function($scope) {
  
  var self = this;
  this.panes = [];
  
  this.addPane = function(pane) {
    self.panes.push(pane);
    
    if(self.panes.length === 1) {
      self.active(pane);
    }
  };
  
  this.active = function(pane) {
    angular.forEach(self.panes, function(pane) {
      pane.active = false;
    });
    
    pane.active = true;
  };
});
