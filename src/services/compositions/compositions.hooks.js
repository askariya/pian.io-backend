

const processCompositions = require('../../hooks/process-compositions');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processCompositions()],
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
