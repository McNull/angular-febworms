app.controller('FormListCtrl', function ($scope, forms, $location, $window, inform) {

  $scope.forms = forms;

  $scope.newForm = function () {
    $location.path('/forms/edit/');
  };

  $scope.editForm = function (form) {
    $location.path('/forms/edit/' + form.id);
  };

  $scope.removeForm = function (form) {
    if ($window.confirm('Are you sure you want to delete the form?')) {
      var idx = app.utils.indexOf(forms, form);
      forms.splice(idx, 1);

      inform.add('Form has been deleted', { type: 'success' });
    }
  };

  $scope.displayDataEntries = function (form) {
    $location.path('/forms/data/' + form.id);
  };

});

app.factory('forms', function () {

  var forms = [
    {
      name: 'Textboxes',
      schema: {
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
        ],
        "name": "Textboxes"
      }
    },
    {
      schema: {
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
        ],
        "name": "All Fields"
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