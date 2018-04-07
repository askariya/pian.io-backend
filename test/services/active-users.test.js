const assert = require('assert');
const app = require('../../src/app');

describe('\'activeUsers\' service', () => {
  it('registered the service', () => {
    const service = app.service('active-users');

    assert.ok(service, 'Registered the service');
  });
});
