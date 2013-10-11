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
    }),
    new febworms.Field('email', {
      templateType: 'text'
    }),
    new febworms.Field('password', {
      templateType: 'text'
    }),
    new febworms.Field('textarea'), new febworms.Field('checkbox'), new febworms.Field('checkboxlist', {
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
  ]
}).factory('febwormsUtils', function ($templateCache) {
    return {
      defaultArea: 'default',
      formatTemplateUrl: function(type, area) {
        return 'febworms/field-templates/' + (area || this.defaultArea) + '/' + type + '.tmpl.html';
      },
      getTemplateUrl: function (field, area) {

        area = area || this.defaultArea;

        var templateType = field.templateType || field.type;
        var templateUrl = this.formatTemplateUrl(templateType, area);

        var cached = $templateCache.get(templateUrl);

        if (!cached) {
          if (area !== this.defaultArea) {
            templateUrl = this.getTemplateUrl(field, this.defaultArea);
          } else {
            return this.formatTemplateUrl('not-in-cache');
          }
        }

        return templateUrl;
      }
    };
  });

