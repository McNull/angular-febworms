var febworms = {};

febworms.Field = function (displayName, name, type, templateUrl, options, value) {

  name = name || displayName.toLowerCase().replace(' ', '');
  type = type || name.toLowerCase();
  templateUrl = templateUrl || 'febworms/fields/' + type + '.tmpl.html';

  this.id = type + 'FebwormsField';
  this.name = name;
  this.displayName = displayName;
  this.type = type;
  this.templateUrl = templateUrl;
  this.options = options;
  this.value = value;
};

angular.module('febworms', ['templates-febworms']).constant('febwormsConfig', {
  fields: [
    new febworms.Field('Textbox', null, 'text', 'febworms/fields/text.tmpl.html'),
    new febworms.Field('Email', null, 'email', 'febworms/fields/text.tmpl.html'),
    new febworms.Field('Textarea'),
    new febworms.Field('Checkbox'),
    new febworms.Field('Checkbox List', null, null, null, [
      { value: '1', text: 'Option 1', checked: true },
      { value: '2', text: 'Option 2', checked: true },
      { value: '3', text: 'Option 3' }
    ]),
    new febworms.Field('Radiobutton List', null, null, null, [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' },
      { value: '3', text: 'Option 3' }
    ], '1'),
    new febworms.Field('Select List', null, null, null, [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' },
      { value: '3', text: 'Option 3' }
    ], '1')
  ]
});

