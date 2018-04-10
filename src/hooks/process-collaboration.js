// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/*
the process-compositions hook is a "before" hook, used to validate
composition entries before they are entered into the database. This hook is used for
any patches made to the compositions record
*/

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    // The authenticated user
    const user = context.params.user;
    let name = data.nameOfComposition;

    const userService = context.app.service('users')

    if(data.newName && data.removeName) {
      const usernames = await userService.find({
        query: {
          username: data.collaborators
        }
      })
      doesUserExist(usernames);
    }

    if(data.newName) {
      // Used when switching compostions
      name = data.newName;
    }

    if(data.removeName) {
      // Used when leaving a composition
      name = data.removeName;
    }

    if(data.collaborators) {
      // Used when adding new collaborators
      name = data.nameOfComposition;
    }

    if(data.newComposition) {
      // Used when updating the current composition
      name = data.nameOfComposition;
    }

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

    let collab = addToCollaboratorList(listOfCollaborators[0].collaborators, data.collaborators);

    // This is used to set the id for the unique composition name so that record is replaced
    context.id = listOfCollaborators[0]._id
    if (data.newName) {
      // get list of previous active users
      let newActiveList = checkForDuplicates(listOfCollaborators, user.username);
      context.data = {
        active: newActiveList
      }
    }
    if (data.removeName) {
      let removedActiveList = removeUser(listOfCollaborators, user.username);
      context.data = {
        active: removedActiveList
      }
    }
    if (data.collaborators) {
      context.data = {
        collaborators: collab
      }
    }
    if (data.newComposition) {
      context.data = {
        composition: data.newComposition
      }
    }

    return context;
  };
};
// This function is used to remove a user from the list of active users
function removeUser (existingData, user) {
  if (existingData[0].active.includes(user)) {
    return existingData[0].active.replace(user,'')
  }
}
// This function is used to check if a user is already part of the list of active users.
// If so, do not add them to the list again.
function checkForDuplicates (data, newActiveUser) {
  if (!data[0].active.includes(newActiveUser)) {
    return data[0].active + ',' + newActiveUser
  } else {
    return data[0].active
  }
}
// This function is used to add new users to the list of collaborators
function addToCollaboratorList (currentList, newUser) {
  if (currentList === '') {
    return newUser;
  } else {
    let tempList = [];

    tempList = currentList;
    tempList.push(newUser);
    return tempList;
  }
}
// This function is used to check whether a composition has been saved or not. If not, the user
// can not make changes to any record
function compositionIsSaved (compositionList) {
  if (compositionList.data.length === 0) {
    throw new Error('Please make sure this composition has been saved')
  }
}
// This function is used to check if a user has already been added to the list of collaborators.
//  If already added, throw a warning.
function isNewCollabThere (listCollab, newCollab) {
  if (listCollab[0].collaborators.indexOf(newCollab) !== -1) {
    throw new Error('Already added as collaborator')
  }
}
// This function is used to check if the collaborator that is to be added exists in the db
function doesUserExist (userList) {
  if (userList.data.length === 0) {
    throw new Error("no such user exists");
  }
}
// This function is used to make sure that the user does not add themselves as the user
function isAddedUserSameAsCollaborator (user, collaborator) {
  if (user === collaborator) {
    throw new Error("You can not collaborate with yourself")
  }
}
