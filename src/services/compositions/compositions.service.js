// Initializes the `compositions` service on path `/compositions`
const createService = require('feathers-mongodb');
const hooks = require('./compositions.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/compositions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('compositions');

  mongoClient.then(db => {
    service.Model = db.collection('compositions');
    // Below is a test database insert (need to do this for real somewhere else)
    // service.Model.insert({"initial_write": "initial test write to the DB"});

  });

  service.hooks(hooks);
};
