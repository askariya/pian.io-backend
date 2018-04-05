
const { authenticate } = require('@feathersjs/authentication').hooks;
const processCompositions = require('../../hooks/process-compositions');
const processCollaboration = require('../../hooks/process-collaboration');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [processCompositions()],
    update: [],
    patch: [processCollaboration()],
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
