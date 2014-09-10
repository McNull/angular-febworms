app.route.items = app.route.items.concat([
  {
    url: '/forms',
    templateUrl: '/app/forms/index.html'
  },
  {
    url: '/forms/edit/:id',
    templateUrl: '/forms/edit.html'
  },
  {
    url: '/forms/create',
    templateUrl: '/forms/edit.html'
  },
  {
    url: '/forms/:id',
    templateUrl: '/forms/display.html'
  }
]);
