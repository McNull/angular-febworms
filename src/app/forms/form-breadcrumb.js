app.directive('formBreadcrumb', function ($route) {

  return {
    templateUrl: 'app/forms/form-breadcrumb.html',
    link: function ($scope) {

      var nodes = [];

      nodes.push({
        path: '/', name: 'Home'
      });

      nodes.push({
        path: '/forms', name: 'Forms'
      });

      var cl = $route.current.locals;

      if (cl.form) {
        nodes.push({
          path: '/forms/' + cl.form.id, name: cl.form.name
        });

        if(cl.formData) {
          nodes.push({
            path: '/forms/' + cl.form.id + '/data/' + (cl.formData.id || 0) + '/edit', name: 'Data'
          });
        }
      }


      $scope.nodes = nodes;
    }
  };

});