describe('febworms-input-directive', function() {

  var febwormsFieldInputLinkFn, $scope, fieldCtrl = {}, modelCtrl = {};

  beforeEach(function() {

    module('febworms');

    inject(function(_febwormsFieldInputLinkFn_, _$rootScope_){
      febwormsFieldInputLinkFn = _febwormsFieldInputLinkFn_;
      $scope = _$rootScope_.$new;
    });

  });

  it('should register the state on the field controller', function() {

    // Arrange 

    fieldCtrl.setFieldState = jasmine.createSpy('setFieldState');
    
    var ctrls = [
      fieldCtrl, modelCtrl
    ];

    // Act

    febwormsFieldInputLinkFn($scope, null, null, ctrls);

    // Assert

    expect(fieldCtrl.setFieldState).toHaveBeenCalledWith(modelCtrl);
  });

});