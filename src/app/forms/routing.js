app.route.forms = [
  {
    url: '/forms',
    controller: 'FormListCtrl',
    templateUrl: '/app/forms/index.html',
    resolve: {
      forms: ['Form', function(Form) {
        return Form.query();
      }]
    }
  },
  {
    url: '/forms/edit/:id?',
    templateUrl: '/app/forms/edit/edit.html',
    controller: 'FormEditCtrl',
    resolve: {
      form: ['Form', '$route', function(Form, $route) {
        return $route.current.params.id ? Form.get($route.current.params) : {};
      }]
    }
  },
  {
    url: '/forms/:id',
    templateUrl: '/app/forms/display.html'
  }
];
