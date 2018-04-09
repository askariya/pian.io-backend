// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

var utils = require('./user-utils');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context; 
    
    //throws an error if we don't get a username, password and email
    // Throw an error if we didn't get a text
    if (!data.email) {
      throw new Error('A user must have an email');
    }
    else if (!data.username) {
      throw new Error('A user must have a username');  
    }
    else if (!data.password) {
      throw new Error('A user must have a password');
    }

    if (!utils.username_is_valid(data.username)) {
      throw new Error("Invalid username");
    }

    if (!utils.email_is_valid(data.email)) {
      throw new Error("Invalid email");
    }

    // context.app.service('users').find({
    //   query: { username: data.username }
    // }).then(console.log("hey"))

    const userService = context.app.service('users')
    const usernames = await userService.find({
      query: {
        username: data.username
      }
    })

    const emails = await userService.find({
      query: {
        email: data.email
      }
    })

    if(utils.confirm_unique_user(emails, usernames)){
      // add field to record creation time and user id
      data.createdAt = new Date().getTime();
    }

    return context;
  };
};

