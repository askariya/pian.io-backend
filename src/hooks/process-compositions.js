// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/*
the process-compositions hook is a "before" hook, used to validate
composition entries before they are entered into the database.
*/

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context; 
    // Throw an error if we didn't get a text
    if(!data.text) {
      throw new Error('A composition must have a text');
    }

     // The authenticated user
     const user = context.params.user;
     // The actual message text
     const text = context.data.text
       // Messages can't be longer than 400 characters
       .substring(0, 400);
 
     // Override the original data (so that people can't submit additional stuff)
     context.data = {
       text,
       // Set the user id for the composition
       userId: user._id,
       // Add the current date
       createdAt: new Date().getTime()
     };

    return context;
  };
};
