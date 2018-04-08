// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context; 

    if (!data.username) {
      throw new Error('An update request must contain a username');
    }

    data.updatedAt = new Date();

    const user = context.params.user;

    return context;
  };
};
