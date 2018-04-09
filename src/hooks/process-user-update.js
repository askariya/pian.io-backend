// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

var utils = require('./user-utils');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context; 

    // Throw error if none of the possible fields are filled out
    if (!data.username && !data.password && !data.email) {
      throw new Error('An update request must contain a username, email or password');
    }
    console.log(context.data);
    
    // if a username has been changed
    if (data.username && !data.password && !data.email) {
      const userService = context.app.service('users')
      const usernames = await userService.find({
        query: {
          username: data.username
        }
      })

    }

    // if an email has been changed
    else if (data.email && !data.username && !data.password) {
      const emails = await userService.find({
        query: {
          email: data.email
        }
      })
    }

    data.updatedAt = new Date();

    const user = context.params.user;

    return context;
  };

};
