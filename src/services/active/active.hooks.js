
const { authenticate } = require('@feathersjs/authentication').hooks;
const processActiveUsers = require('../../hooks/process-activeUsers');
const processRemoveUsers = require('../../hooks/process-activeRemoval');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [processActiveUsers()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
