var febworms = {};

febworms.Field = function (type, properties) {
  this.type = type;
  this.id = 'field.' + type;

  if (properties) {
    angular.extend(this, properties);
  }

  this.displayName = this.displayName || this.type[0].toUpperCase() + this.type.substring(1);
};

angular.module('febworms', ['dq', 'templates-febworms']).constant('febwormsConfig', {
  fields: {
    templates: [
      new febworms.Field('text', {
        displayName: 'Textbox'
      }), new febworms.Field('email'), new febworms.Field('password'), new febworms.Field('textarea'), new febworms.Field('checkbox'), new febworms.Field('checkboxlist', {
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
      })
    ],
    aliases: {
      'email': 'text',
      'password': 'text'
    },
    categories: {
      'Text input fields': [ 'text', 'email', 'password', 'textarea' ],
      'Checkbox fields': [ 'checkbox', 'checkboxlist' ],
      'Select input fields': [ 'radiobuttonlist', 'selectlist' ]
    }
  }
}).factory('febwormsUtils',function ($templateCache, $window, febwormsConfig) {
    return {
      defaultArea: 'default',
      formatTemplateUrl: function (type, area) {
        return 'febworms/field-templates/' + (area || this.defaultArea) + '/' + type + '.tmpl.html';
      },
      getTemplateUrl: function (field, area) {

        area = area || this.defaultArea;

        var templateType = febwormsConfig.fields.aliases[field.type] || field.type;
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
      findElementsByClass: function (root, className, recursive, buffer) {
        buffer = buffer || [];

        if (root.className === className) {
          buffer.push(root);
        }

        if (root.hasChildNodes()) {
          for (var i = 0; i < root.children.length; i++) {
            var child = root.children[i];
            if (child.className === className) {
              buffer.push(child);
            }
            if (recursive) {
              this.findElementsByClass(child, className, recursive, buffer);
            }
          }
        }

        return buffer;
      },
      getCursorPosition: function (e) {

        var x = 0, y = 0;

        if (!e) e = window.event;
        if (e.pageX || e.pageY) 	{
          x = e.pageX;
          y = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
          x = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
          y = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
        }

        return { x: x, y: y };

        // posx and posy contain the mouse position relative to the document
        // Do something with this information

//        if (!e) e = $window.event;
//
//        var x, y;
//
//        if (typeof e.clientX === 'undefined') {
//          x = e.pageX;
//          y = e.pageY;
//        } else {
//          x = e.clientX;
//          y = e.clientY;
//        }

        //var doc = $window.document.documentElement;
//
//        x += doc.scrollLeft;
//        y += doc.scrollTop;


        return { x: x, y: y };
      }
    };
  });