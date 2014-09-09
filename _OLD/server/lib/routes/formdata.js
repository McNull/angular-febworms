
var util = require('../util');
var _ = require('lodash');

module.exports.addRoutes = function(app, config) {

  var dataFilepath = process.cwd() + '/' + config.server.dataFolder + '/formdata.json';
  var repository = util.readJsonSync(dataFilepath);

  app.get('/api/form/:formId/data', function(req, res) {
    var entities = _.where(repository, { formId: parseInt(req.params.formId) });
    res.json(entities);
  });

  app.get('/api/form/:formId/data/:id', function(req, res) {

    var entity = _.find(repository, { id: parseInt(req.params.id) });

    if(entity) {
      res.json(entity);
    } else {
      res.send(404);
    }
  });

  app.post('/api/form/:formId/data', function(req, res) {

    var max = _.max(repository, 'id') || 0;
    req.body.id = max === -Infinity ? 1 : max.id + 1;
    req.body.formId = parseInt(req.params.formId);

    repository.push(req.body);

    util.writeJsonSync(dataFilepath, repository);

    res.statusCode = 200;
    res.json(req.body);
  });

  app.post('/api/form/:formId/data/:id', function(req, res) {

    var id = parseInt(req.params.id);
    var entity = _.find(repository, { id: id });

    if(entity) {

      req.body.formId = parseInt(req.params.formId);

      _.extend(entity, req.body);

      util.writeJsonSync(dataFilepath, repository);
      res.send(200);

    } else {
      res.send(404);
    }
  });

  app.delete('/api/form/:formId/data/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var idx = _.findIndex(repository, { id: id });

    if(idx > -1) {
      repository.splice(idx, 1);
      util.writeJsonSync(dataFilepath, repository);
      res.send(200);
    } else {
      res.send(404);
    }
  });
};