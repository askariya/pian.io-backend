// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { id } = context; 
    const { params } = context;
    // if the get service is called with a null ID, assign user id from context
    if(id === null){
      context.id = params.user._id 
    }
    return context;
  };
};
