describe('febworms-edit-controller', function() {

  var $controller, $scope, febwormsConfig;

  beforeEach(function() {

    module('febworms');

    inject(function(_$controller_, _$rootScope_, _febwormsConfig_) {

      $controller = _$controller_;

      febwormsConfig = _febwormsConfig_;

      $scope = _$rootScope_.$new();

      // Supplied by directive

      $scope.schema = {};

    });

  });

  it('should construct the controller', function() {

    // Arrange


    // Act

    var controller = $controller('febwormsEditController', {
      $scope: $scope
    });

    // Assert

    expect(controller).toBeDefined();
  });

  describe('schema.$_invalid', function() {

    it('should be invalid when metaForm is not available', function() {

      // Arrange

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(false);

    });

    it('should be invalid when metaForm is invalid', function() {

      // Arrange

      var metaForm = {
        $invalid: true
      };
      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });
      controller.setMetaForm(metaForm);

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(true);

    });

    it('should not be invalid when metaForm is not invalid', function() {

      // Arrange

      var metaForm = {
        $invalid: false
      };
      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });
      controller.setMetaForm(metaForm);

      // Act

      $scope.$digest();

      // Assert

      expect($scope.schema.$_invalid).toBe(false);

    });
  });

  describe('addField', function() {

    it('should add field to the end of the fields array', function() {

      // Arrange

      $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      var field = new febworms.Field('myType');

      // Act

      controller.addField(field);

      // Assert

      expect($scope.schema.fields.length).toBe(4);
      expect($scope.schema.fields[3].type).toBe(field.type);
    });

    it('should create a copy of the provided field', function() {

      // Arrange

      $scope.schema.fields = [];
      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      var field = new febworms.Field('myType');

      // Act

      controller.addField(field);

      // Assert

      expect($scope.schema.fields[0]).not.toBe(field);
      expect($scope.schema.fields[0].type).toBe(field.type);
    });

    it('should add field at specified index', function() {

      // Arrange

      $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      var field = new febworms.Field('myType');

      // Act

      controller.addField(field, 1);

      // Assert

      expect($scope.schema.fields.length).toBe(4);
      expect($scope.schema.fields[1].type).toBe(field.type);
    });

  });

  describe('removeField', function() {

    it('should remove field by index', function() {

      // Arrange

      var index = 1;

      $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.removeField(index);

      // Assert

      expect($scope.schema.fields.length).toBe(2);
      expect(_.find($scope.schema.fields, {
        name: 'Zwein'
      })).toBeFalsy();
    });
  });

  describe('swapFields', function() {

    it('should swap fields by indices', function() {

      // Arrange

      $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.swapFields(0, 1);

      // Assert

      expect($scope.schema.fields[0].type).toBe('Zwein');
      expect($scope.schema.fields[1].type).toBe('Ein');
      expect($scope.schema.fields[2].type).toBe('Drein');

    });

    it('should NOT swap fields on array edges', function() {

      // Arrange

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      function isUnchangedAfterSwap(idx1, idx2) {

        $scope.schema.fields = [
          new febworms.Field('Ein'),
          new febworms.Field('Zwein'),
          new febworms.Field('Drein')
        ];

        controller.swapFields(idx1, idx2);

        return $scope.schema.fields[0] && $scope.schema.fields[0].type === 'Ein' &&
          $scope.schema.fields[1] && $scope.schema.fields[1].type === 'Zwein' &&
          $scope.schema.fields[2] && $scope.schema.fields[2].type === 'Drein';
      }

      // Act & Assert

      expect(isUnchangedAfterSwap(-1, 0)).toBeTruthy();
      expect(isUnchangedAfterSwap(0, -1)).toBeTruthy();
      expect(isUnchangedAfterSwap(3, 0)).toBeTruthy();
      expect(isUnchangedAfterSwap(0, 3)).toBeTruthy();
      expect(isUnchangedAfterSwap(-1, 3)).toBeTruthy();
      expect(isUnchangedAfterSwap(3, -1)).toBeTruthy();
    });
  });

  describe('moveField', function() {

    it('should not move if target index is the same', function() {

      // Arrange

       $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.moveField(2, 2);

      // Assert
      
      expect($scope.schema.fields[0].type).toBe('Ein');
      expect($scope.schema.fields[1].type).toBe('Zwein');
      expect($scope.schema.fields[2].type).toBe('Drein');
    });

    it('should move field to new index (1/3)', function() {

      // Arrange
 
       $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.moveField(0, 3);

      // Assert
      
      expect($scope.schema.fields[0].type).toBe('Zwein');
      expect($scope.schema.fields[1].type).toBe('Drein');
      expect($scope.schema.fields[2].type).toBe('Ein');
    });

    it('should move field to new index (2/3)', function() {

      // Arrange
 
       $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.moveField(0, 2);

      // Assert
      
      expect($scope.schema.fields[0].type).toBe('Zwein');
      expect($scope.schema.fields[1].type).toBe('Ein');
      expect($scope.schema.fields[2].type).toBe('Drein');
    });

    it('should move field to new index (3/3)', function() {

      // Arrange
 
       $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.moveField(1, 0);

      // Assert
      
      expect($scope.schema.fields[0].type).toBe('Zwein');
      expect($scope.schema.fields[1].type).toBe('Ein');
      expect($scope.schema.fields[2].type).toBe('Drein');
    });

    it('should not move beyond array bounderies (1/2)', function() {

      // Arrange
 
       $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.moveField(0, 10);

      // Assert
      
      expect($scope.schema.fields[0].type).toBe('Ein');
      expect($scope.schema.fields[1].type).toBe('Zwein');
      expect($scope.schema.fields[2].type).toBe('Drein');
    });

    it('should not move beyond array bounderies (2/2)', function() {

      // Arrange
 
       $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.moveField(-10, 0);

      // Assert
      
      expect($scope.schema.fields[0].type).toBe('Ein');
      expect($scope.schema.fields[1].type).toBe('Zwein');
      expect($scope.schema.fields[2].type).toBe('Drein');
    });

    it('should move to edge boundery of array', function() {

      // Arrange
 
       $scope.schema.fields = [
        new febworms.Field('Ein'),
        new febworms.Field('Zwein'),
        new febworms.Field('Drein')
      ];

      var controller = $controller('febwormsEditController', {
        $scope: $scope
      });

      // Act

      controller.moveField(0, 3);

      // Assert
      
      expect($scope.schema.fields[0].type).toBe('Zwein');
      expect($scope.schema.fields[1].type).toBe('Drein');
      expect($scope.schema.fields[2].type).toBe('Ein');
    });

  });

});