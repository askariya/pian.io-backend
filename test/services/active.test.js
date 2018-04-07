const assert = require('assert');
const app = require('../../src/app');

describe('\'active\' service', () => {
  it('registered the service', () => {
    const service = app.service('active');

    assert.ok(service, 'Registered the service');
  });
});
