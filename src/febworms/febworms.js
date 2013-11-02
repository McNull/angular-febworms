var febworms = {};
/**
 * Constructor for febworm Field types.
 * @param {string} type         Indicates the type of field
 * @param {object} properties   [optional] Initial property values
 * @param {object} renderInfo   [optional] Render information
 */
febworms.Field = function (type, properties, renderInfo) {
  this.type = type;

  if (properties) {
    angular.extend(this, properties);
  }

  this.displayName = this.displayName || this.type.charAt(0).toUpperCase() + this.type.substring(1);
  febworms.Field[type] = renderInfo || {};
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
      }), 
      new febworms.Field('email'), 
      new febworms.Field('password'), 
      new febworms.Field('textarea'), 
      new febworms.Field('checkbox', {}, { hideLabel: true }), 
      new febworms.Field('checkboxlist', {
        displayName: 'Checkbox List',
        options: [
          { value: '1', text: 'Option 1' },
          { value: '2', text: 'Option 2' },
          { value: '3', text: 'Option 3' }
        ],
        value: {
          '1': true, '2': true
        }
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
});