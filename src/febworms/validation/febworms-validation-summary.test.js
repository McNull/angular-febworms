describe('febworms-validation-summary', function() {

  var $compile, $scope, formField, schemaField;

  var template = '<div febworms-validation-summary data-form-field="formField" data-schema-field="schemaField"></div>';

  beforeEach(function() {

    formField = {
      $invalid: true
    };

    schemaField = {};

    module('febworms');

    inject(function(_$compile_, _$rootScope_) {

      $compile = _$compile_;
      $scope = _$rootScope_.$new();

    });

    $scope.formField = formField;
    $scope.schemaField = schemaField;
  });

  it('should compile template', function() {

    // Act

    var $element = $compile(template)($scope);
    $scope.$digest();

    // The directive will replace the div and set the first entry of the element to a comment indicating the ng-if
    // statement. We grab the real element here by going up from the comment node and down again to the real element.

    $element = angular.element($element[0].parentNode.children[0]);
    var result = $element.hasClass('febworms-validation-summary');

    // Assert

    expect(result).toBe(true);
  });

});
