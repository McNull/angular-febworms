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
      name: 'My Second Form'
    }
  ];

  var i = forms.length;

  while (i--) {
    forms[i].id = i + 1;
  }

  return forms;

});