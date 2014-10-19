app.factory('Form', function ($q, $timeout, blockUI, formData) {

  var fakeWaitTime = 500, idCounter = formData.length;

  sortForms();

  function sortForms() {
    formData.sort(function (x, y) {
      return y.id - x.id;
    });
  }

  function fakeHttpResolve(data) {
    var defer = $q.defer();

    blockUI.start();

    $timeout(function () {

      blockUI.stop();
      defer.resolve(data);

    }, fakeWaitTime);

    return defer.promise;
  }

  function query(params) {
    return fakeHttpResolve(formData);
  }

  function get(params) {
    var form = app.utils.singleOrDefault(formData, function (x) {
      return x.id == params.id;
    });

    if (!form) {
      throw new Error('Form not found');
    }

    return fakeHttpResolve(form);
  }

  function remove(params) {
    var idx = app.utils.indexOf(formData, params);

    if (idx !== -1) {
      formData.splice(idx, 1);
      sortForms();
      return fakeHttpResolve();
    } else {
      throw new Error('Form not found');
    }
  }

  function save(params) {

    var idx = app.utils.indexOfMatch(formData, function (x) {
      return x.id === params.id;
    });

    if (idx !== -1) {
      formData.splice(idx, 1, params);
    } else {
      params.id = ++idCounter;
      formData.push(params);
    }

    sortForms();

    return fakeHttpResolve(params);
  }

  return {
    query: query,
    get: get,
    remove: remove,
    save: save
  };

});

app.factory('formData', function () {
  var forms = [
    {
      "schema": {
        "name": "All Fields",
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
      "name": "All Fields",
      "id": 3,
      "layout": "form-horizontal",
      "description": "Contains all available field templates."
    },
    {
      "name": "Textboxes",
      "schema": {
        "name": "Textboxes",
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
      },
      "id": 2,
      "layout": "form-horizontal",
      "description": "Contains all textbox field templates."
    },
    {
      "name": "Validation",
      "schema": {
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
      },
      "id": 1
    }
  ];

  var i = forms.length;

  while (i--) {
    forms[i].id = i + 1;
  }

  return forms;
});