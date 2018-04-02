const compositions = require('./compositions/compositions.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(compositions);
  app.configure(users);
};
