angular.module('febworms').directive('febwormsRender', function() {

  return {
    require: ['^febwormsForm'],
    restrict: 'AE',
    templateUrl: 'febworms/render/render.tmpl.html',
    link: function($scope, $element, $attrs, ctrls) {}
  };

});