
(function(app) {

  app.utils = {
    toDashCased: function (str) {
      return str.replace(/([a-z])([A-Z])/g, "$1-$2").split(' ').join('-').toLowerCase();
    },
    indexOf: function(arr, obj) {

      var predicate = function(x) {
        return x === obj;
      };

      return app.utils.indexOfMatch(arr, predicate);

    },
    indexOfMatch: function(arr, predicate) {
      var i = arr.length;

      while(i--) {
        if(predicate(arr[i])) {
          return i;
        }
      }

      return -1;
    },
    singleOrDefault: function(arr, predicate) {
      var idx = app.utils.indexOfMatch(arr, predicate);
      return idx === -1 ? null : arr[idx];
    }
  };
})(app);

