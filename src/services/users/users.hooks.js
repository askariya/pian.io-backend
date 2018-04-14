const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const processUsers = require('../../hooks/process-users');

const processUserUpdate = require('../../hooks/process-user-update');

const gravatar = require('../../hooks/gravatar');

const processGetUser = require('../../hooks/process-get-user');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [authenticate('jwt'), processGetUser()],
    create: [hashPassword(), processUsers(), gravatar()],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [hashPassword(), authenticate('jwt'), processUserUpdate()],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
