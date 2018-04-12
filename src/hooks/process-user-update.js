// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

var utils = require('./user-utils');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context; 
    const { params } = context;

    // Throw error if none of the possible fields are filled out
    if (!data.username && !data.password && !data.email) {
      throw new Error('An update request must contain a username, email or password');
    }
    // console.log("context")
    // console.log(context)
    // adjust query to perform patch for only this user
    params.query = {
      username: params.user.username,
      email: params.user.email
    }

    const userService = context.app.service('users')

    // if this is a Username change request
    if (data.username && !data.password && !data.email) {
      // check username is valid
      if (!utils.username_is_valid(data.username)) {
        throw new Error("Invalid username");
      }
      // get list of existing users with proposed username
      const usernames = await userService.find({
        query: {
          username: data.username
        }
      })
      // check proposed username is unique
      if(utils.confirm_unique_user(null, usernames)){
        // if so, add an updated time
        data.updatedAt = new Date().getTime();
      }
    }

    // if this is an Email change request
    else if (data.email && !data.username && !data.password) {
      // check email is valid
      if (!utils.email_is_valid(data.email)) {
        throw new Error("Invalid email");
      }
      const emails = await userService.find({
        query: {
          email: data.email
        }
      })
      if(utils.confirm_unique_user(emails, null)){
        data.updatedAt = new Date().getTime();
      }
    }

    // if this is a Password change request
    else if (data.password && !data.email && !data.username) {
      data.updatedAt = new Date().getTime();
    }

    return context;
  };

};
