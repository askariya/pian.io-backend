const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const processUsernameUpdate = require('../../src/hooks/process-username-update');

describe('\'process-username-update\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: processUsernameUpdate()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
