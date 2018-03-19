// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context; 
    
    //throws an error if we don't get a username, password and email
    // Throw an error if we didn't get a text
    if(!data.email) {
      throw new Error('A user must have an email');
    }
    else if(!data.username){
      throw new Error('A user must have a username');
    }
    else if(!data.password){
      throw new Error('A user must have a password');
    }

    if(!username_is_valid(data.username)){
      throw new Error("Invalid username");
    }

    if(!email_is_valid(data.email)){
      throw new Error("Invalid email");
    }

    return context;
  };
};

// regex code adapted from: https://stackoverflow.com/questions/7331289/javascript-function-valid-username
function username_is_valid(username) {
  return /^[0-9a-zA-Z_.-]+$/.test(username);
}

//regex code adapted from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function email_is_valid(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

