// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/*
the process-compositions hook is a "before" hook, used to validate
composition entries before they are entered into the database. It is used when creating new
composition entries
*/

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;
    const { params } = context;

    // Throw an error if we didn't get a text
    if(!data.text) {
      throw new Error('A composition must have a text');
    }

     // The authenticated user
     const user = params.user.username;
     const name = data.nameOfComposition;

     //Check to see if the composition name already exists
     const compositionService = context.app.service('compositions')
     const compositionWanted = await compositionService.find({
       query: {
           nameOfComposition : name
       }
     })

     compositionIsUnique(compositionWanted);

     // Override the original data (so that people can't submit additional stuff)
     context.data = {
       composition: data.text,
       nameOfComposition: data.nameOfComposition,
       collaborators: [],
       // Set the user id for the composition
       ownerId: user,
       // Add the current date
       createdAt: new Date().getTime(),
       active: [user]
     };
    return context;
  };
};

function compositionIsUnique(compositionList) {
    if (compositionList.data.length !== 0) {
        throw new Error('A composition of this name already exists, please try again')
    }
}
