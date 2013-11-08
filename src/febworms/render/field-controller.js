angular.module('febworms').controller('febwormsFieldController', function($scope) {

  var self = this;
  var _form, _field;

  this.init = function(febwormsFormCtrl, fieldSchema, editMode) {
    
    self.initForm();
    self.initField(fieldSchema);
    self.initDefaultData(fieldSchema, editMode);

    $scope.form = _form;
    $scope.field = _field;

  };

  this.initForm = function(febwormsFormCtrl) {
    _form = febwormsFormCtrl ? febwormsFormCtrl.model : {};
    return _form;
  };

  this.initField = function(fieldSchema) {

    _field = {
      schema: fieldSchema
    };

    $scope.$watch('field.schema.name', function(value, oldValue) {
      self.registerState(value);
    });
  };

  this.initDefaultData = function(fieldSchema, editMode) {

    var fieldName = fieldSchema.name;
    var formData = _form.data || {};

    if (editMode) {
      $scope.$watch('field.schema.value', function(value) {
        formData[fieldName] = value;
      });
    } else if (formData && formData[fieldName] === undefined) {
      formData[fieldName] = fieldSchema.value;
    }
  };

  this.setFieldState = function(state) {
    _field.state = state;
    self.registerState(_field.schema.name);
  };

  this.registerState = function(fieldName) {
    // Re-register the ngModelCtrl with the form controller
    // whenever the name of the field has been modified.

    if (_form.state && _field.state) {
      _form.state.$removeControl(_field.state);
      _field.state.$name = fieldName;
      _form.state.$addControl(_field.state);
    }

    _field.name = fieldName;
  };

  this.field = function() {
    return _field;
  };

  this.form = function() {
    return _form;
  };
});