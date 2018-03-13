const assert = require('assert');
const app = require('../../src/app');

describe('\'compositions\' service', () => {
  it('registered the service', () => {
    const service = app.service('compositions');

    assert.ok(service, 'Registered the service');
  });
});
