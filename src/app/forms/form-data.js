app.factory('forms', function () {

  var forms = [
    {
      name: 'Validation',
      schema: {
        "fields": [
          {
            "type": "text",
            "name": "field471",
            "displayName": "Textbox",
            "validation": {
              "messages": {},
              "pattern": "^test 123$"
            },
            "placeholder": "Should match \"test 123\""
          }
        ],
        "name": "Validation"
      }
    },
    {
      name: 'Textboxes',
      schema: {
        "name": 'Textboxes', // TODO: Kill me
        "fields": [
          {
            "type": "text",
            "name": "field553",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "email",
            "name": "field555",
            "displayName": "Email",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "number",
            "name": "field557",
            "validation": {
              "maxlength": 15,
              "messages": {}
            },
            "displayName": "Number"
          },
          {
            "type": "password",
            "name": "field559",
            "displayName": "Password",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "textarea",
            "name": "field561",
            "displayName": "Textarea",
            "validation": {
              "messages": {}
            }
          }
        ]
      }
    },
    {
      schema: {
        "name": "All Fields", // TODO: killme
        "fields": [
          {
            "type": "text",
            "name": "field553",
            "displayName": "Textbox",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "email",
            "name": "field555",
            "displayName": "Email",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "number",
            "name": "field557",
            "validation": {
              "maxlength": 15,
              "messages": {}
            },
            "displayName": "Number"
          },
          {
            "type": "password",
            "name": "field559",
            "displayName": "Password",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "textarea",
            "name": "field561",
            "displayName": "Textarea",
            "validation": {
              "messages": {}
            }
          },
          {
            "type": "checkbox",
            "name": "field7781",
            "nolabel": true,
            "displayName": "Checkbox"
          },
          {
            "type": "checkboxlist",
            "name": "field7783",
            "displayName": "Checkbox List",
            "options": [
              {
                "value": "1",
                "text": "Option 1"
              },
              {
                "value": "2",
                "text": "Option 2"
              },
              {
                "value": "3",
                "text": "Option 3"
              }
            ],
            "value": {
              "1": true,
              "2": true
            }
          },
          {
            "type": "radiobuttonlist",
            "name": "field7787",
            "displayName": "Radiobutton List",
            "options": [
              {
                "value": "1",
                "text": "Option 1"
              },
              {
                "value": "2",
                "text": "Option 2"
              },
              {
                "value": "3",
                "text": "Option 3"
              }
            ],
            "value": "1"
          },
          {
            "type": "selectlist",
            "name": "field7789",
            "displayName": "Select List",
            "options": [
              {
                "value": "1",
                "text": "Option 1"
              },
              {
                "value": "2",
                "text": "Option 2"
              },
              {
                "value": "3",
                "text": "Option 3"
              }
            ],
            "value": "1"
          }
        ]
      },
      "name": "All Fields"
    }
  ];

  var i = forms.length;

  while (i--) {
    forms[i].id = i + 1;
  }

  return forms;

});