app.factory('FormData', function(fakeHttpResolve, dataEntries) {

  var idCounter = 0;

  function query(params) {
    var result = app.utils.where(dataEntries, function(x) {
      return x.formId == params.id;
    });

    return fakeHttpResolve(result);
  }

  function remove(params) {
    var idx = app.utils.indexOfMatch(dataEntries, function (x) {
      return x.id === params.id;
    });

    if (idx !== -1) {
      dataEntries.splice(idx, 1);
      return fakeHttpResolve();
    } else {
      throw new Error('Form not found');
    }
  }

  function save(params) {
    var idx = app.utils.indexOfMatch(dataEntries, function (x) {
      return x.id === params.id;
    });

    if (idx !== -1) {
      dataEntries.splice(idx, 1, params);
    } else {
      params.id = ++idCounter;
      dataEntries.push(params);
    }

    return fakeHttpResolve(params);
  }

  function get(params) {

    var ret = app.utils.singleOrDefault(dataEntries, function(x) {
      return x.id == params.dataId;
    });

    if(!ret) {
      throw new Error('Not found');
    } else {
      return fakeHttpResolve(ret);
    }
  }

  return {
    query: query,
    save: save,
    remove: remove,
    get: get
  };

});

app.factory('dataEntries', function(formData) {

  var dataEntries = [];

  var v = app.utils.singleOrDefault(formData, function(x) {
    return x.name == 'Textbox Validation';
  });

  if(v) {
    (function(v) {
      var i = 5;

      while(i--) {
        dataEntries.push({
          formId: v.id,
          "pattern": "test 123",
          "required": "I'm required",
          "minLength": "55555",
          "maxLength": "666666"
        });
      }
    })(v);
  }

  (function() {
    var i = 0;
    angular.forEach(dataEntries, function(e) {
      e.id = ++i;
    });
  })();

  return dataEntries;
});