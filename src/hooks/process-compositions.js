// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/*
the process-compositions hook is a "before" hook, used to validate
composition entries before they are entered into the database.
*/

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    return context;
  };
};