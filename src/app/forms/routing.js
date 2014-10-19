
var getFormById = ['Form', '$route', function(Form, $route) {
  return parseInt($route.current.params.id) ? Form.get($route.current.params) : {};
}];

var queryFormDataByFormId = ['FormData', '$route', function(FormData, $route) {
  return parseInt($route.current.params.id) ? FormData.query($route.current.params) : [];
}];

var getFormDataByDataId = ['FormData', '$route', function(FormData, $route) {
  return parseInt($route.current.params.dataId) ? FormData.get($route.current.params) : {};
}];

app.route.forms = [
  {
    url: '/forms',
    controller: 'FormListCtrl',
    templateUrl: '/app/forms/index.html',
    resolve: {
      forms: ['Form', function(Form) {
        return Form.query();
      }]
    },
    label: 'Forms'
  },
  {
    url: '/forms/:id/edit',
    templateUrl: '/app/forms/edit/edit.html',
    controller: 'FormEditCtrl',
    resolve: {
      form: getFormById
    },
    label: 'Edit'
  },
  {
    url: '/forms/:id/data/:dataId/edit',
    templateUrl: '/app/forms/data/edit/data-edit.html',
    controller: 'FormDataEditCtrl',
    resolve: {
      form: getFormById,
      formData: getFormDataByDataId
    },
    label: 'Edit'
  },
  {
    url: '/forms/:id',
    templateUrl: '/app/forms/data/data-list.html',
    controller: 'FormDataListCtrl',
    resolve: {
      form: getFormById,
      dataEntries: queryFormDataByFormId
    },
    label: 'Data'
  }
];
