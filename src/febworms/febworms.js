var febworms = {};

febworms.Field = function (type, properties) {
  this.type = type;

  if (properties) {
    angular.extend(this, properties);
  }

  this.displayName = this.displayName || this.type.charAt(0).toUpperCase() + this.type.substring(1);
};

angular.module('febworms', ['dq', 'templates-febworms']).constant('febwormsConfig', {
  enableDebugInfo: true,
  validation: {
    messages: {
      required: 'Field value is required.',
      minlength: 'Field value does not match the minimum length.',
      maxlength: 'Field value exceeds the maximum length.',
      pattern: 'Field value does not match the required format.',
      email: 'Field value should be an email address.',
      unique: 'Field value is not unique.'
    }
  },
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
    categories: {
      'Text input fields': {
        'text': true, 'email': true, 'password': true, 'textarea': true
      },
      'Checkbox fields': { 'checkbox': true, 'checkboxlist': true },
      'Select input fields': { 'radiobuttonlist': true, 'selectlist': true }
    }
  }
}).factory('febwormsUtils', function ($templateCache, $window, febwormsConfig) {

    var uniqueCounter = 0;

    return {
      defaultArea: 'default',
      formatTemplateUrl: function (type, area) {
        return 'febworms/field-templates/' + (area || this.defaultArea) + '/' + type + '.tmpl.html';
      },
      getTemplateUrl: function (field, area) {

        area = area || this.defaultArea;

        // IE8 fix: Aliases removed
        // var templateType = febwormsConfig.fields.aliases[field.type] || field.type;
        var templateType = field.type;
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
      getUnique: function() {
        return ++uniqueCounter;
      },
      copyField: function(field) {
        var copy = angular.copy(field);
        copy.name = 'field' + this.getUnique();
        return copy;
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
      }
    };
  });