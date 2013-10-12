var febworms = {};

febworms.Field = function (type, properties) {
  this.type = type;
  this.id = 'field.' + type;

  if (properties) {
    angular.extend(this, properties);
  }

  this.displayName = this.displayName || this.type[0].toUpperCase() + this.type.substring(1);
};

angular.module('febworms', ['templates-febworms']).constant('febwormsConfig', {
  fields: [
    new febworms.Field('text', {
      displayName: 'Textbox'
    }), new febworms.Field('email', {
      templateType: 'text'
    }), new febworms.Field('password', {
      templateType: 'text'
    }), new febworms.Field('textarea'), new febworms.Field('checkbox'), new febworms.Field('checkboxlist', {
      displayName: 'Checkbox List',
      options: [
        { value: '1', text: 'Option 1', checked: true },
        { value: '2', text: 'Option 2', checked: true },
        { value: '3', text: 'Option 3' }
      ]
    }), new febworms.Field('radiobuttonlist', {
      displayName: 'Radiobutton List',
      options: [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
      ],
      value: '1'
    }), new febworms.Field('selectlist', {
      displayName: 'Select List',
      options: [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
      ],
      value: '1'
    }) // , new febworms.Field('dragproxy')
  ]
}).factory('febwormsUtils',function ($templateCache, $window) {
    return {
      defaultArea: 'default',
      formatTemplateUrl: function (type, area) {
        return 'febworms/field-templates/' + (area || this.defaultArea) + '/' + type + '.tmpl.html';
      },
      getTemplateUrl: function (field, area) {

        area = area || this.defaultArea;

        var templateType = field.templateType || field.type;
        var templateUrl = this.formatTemplateUrl(templateType, area);

        var cached = $templateCache.get(templateUrl);

        if (!cached) {

          // Url is not in cache -- fallback to default area.
          // Properties area will never fallback to default area.

          if (area !== 'properties' && area !== this.defaultArea) {
            templateUrl = this.getTemplateUrl(field, this.defaultArea);
          } else {
            return this.formatTemplateUrl('not-in-cache');
          }
        }

        return templateUrl;
      },
      stopEvent: function (e) {

        if (!e) e = $window.event;

        // e.cancelBubble is supported by IE8 -
        // this will kill the bubbling process.
        e.cancelBubble = true;

        // e.stopPropagation works in modern browsers
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        return false;
      },
      getCursorPosition: function (e) {
        var x, y;

        if (typeof e.clientX === 'undefined') {
          x = e.pageX;
          y = e.pageY;
        } else {
          x = e.clientX;
          y = e.clientY;
        }

        var doc = $window.document.documentElement;

        x += doc.scrollLeft;
        y += doc.scrollTop;

        return { x: x, y: y };
      },
      containsPoint: function(rect, pos) {

        var left = Math.abs(rect.left);
        var top = Math.abs(rect.top);

        var result = pos.x < left + rect.width &&
          pos.x >= left &&
          pos.y < top + rect.height &&
          pos.y >= top;


        if(!result) {
          console.log('pos', pos);
          console.log('rect', rect);
        }

        return result;
      }
    };
  }).directive('febwormsDraggable', function () {

    function handleDragStart(e, dragData) {
      dragData = angular.toJson(dragData || {});

      console.log('dragData', dragData);

      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text', dragData);

      var target = e.target || e.srcElement;
      target.classList.add('febworms-drag');

      return false;
    }

    function handleDragEnd(e) {
      var target = e.target || e.srcElement;
      target.classList.remove('febworms-drag');
      return false;
    }

    return {
      restrict: 'A',
      link: function (scope, element, attr) {

        var dragData = scope.$eval(attr.febwormsDraggable);

        element.attr('draggable', true);
        element.on('dragstart', function (e) {
          return handleDragStart(e, dragData);
        });
        element.on('dragend', function (e) {
          return handleDragEnd(e);
        });
      }
    };
  });

