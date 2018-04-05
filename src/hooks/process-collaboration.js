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

    // The authenticated user
    const name = data.compositionName;

    const userService = context.app.service('users')
    const usernames = await userService.find({
      query: {
          username: data.collaborators
      }
    })

    const compositionService = context.app.service('compositions')
    const compositionWanted = await compositionService.find({
      query: {
          nameOfComposition : name
      }
    })

    compositionIsSaved(compositionWanted);

    let listOfCollaborators = compositionWanted.data;

    isNewCollabThere(listOfCollaborators, data.collaborators);

    let firstResult = listOfCollaborators[0];

    let collab = listOfCollaborators[0].collaborators + ',' + data.collaborators;

    doesUserExist(usernames);

    context.id = listOfCollaborators[0]._id 
    context.data = {
     collaborators: collab
    };

    return context;
  };
};
function compositionIsSaved(compositionList) {
    if (compositionList.data.length === 0) {
        throw new Error('Please make sure this composition has been saved')
    }
}

function isNewCollabThere(listCollab, newCollab) {
    if(listCollab[0].collaborators.includes(newCollab)){
        throw new Error('Already added as collaborator')
    }
}

function doesUserExist(userList) {
    if (userList.data.length === 0) {
        throw new Error("no such user exists");
    }
}

function isAddedUserSameAsCollaborator (user, collaborator) {
    if(user === collaborator) {
        throw new Error("You can not collaborate with yourself")
    }
}
