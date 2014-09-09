
var util = require('../util');
var _ = require('lodash');

module.exports.addRoutes = function(app, config) {

  var dataFilepath = process.cwd() + '/' + config.server.dataFolder + '/forms.json';
  var forms = util.readJsonSync(dataFilepath);

  app.get('/api/form', function(req, res) {
    res.json(forms);
  });

  app.get('/api/form/:id', function(req, res) {

    var entity = _.find(forms, { id: parseInt(req.params.id) });

    if(entity) {
      res.json(entity);
    } else {
      res.send(404);
    }
  });

  app.post('/api/form', function(req, res) {

    var max = _.max(forms, 'id') || 0;
    req.body.id = max === -Infinity ? 1 : max.id + 1;

    forms.push(req.body);

    util.writeJsonSync(dataFilepath, forms);

    res.statusCode = 200;
    res.json(req.body);
  });

  app.post('/api/form/:id', function(req, res) {

    var id = parseInt(req.params.id);
    var entity = _.find(forms, { id: id });

    if(entity) {

      _.extend(entity, req.body);

      util.writeJsonSync(dataFilepath, forms);
      res.send(200);

    } else {
      res.send(404);
    }
  });

  app.delete('/api/form/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var idx = _.findIndex(forms, { id: id });

    if(idx > -1) {
      forms.splice(idx, 1);
      util.writeJsonSync(dataFilepath, forms);
      res.send(200);
    } else {
      res.send(404);
    }
  });
};