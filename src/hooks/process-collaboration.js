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
    const user = context.params.user;
    let name = data.nameOfComposition;

    const userService = context.app.service('users')

    if(data.newName && data.removeName){
        const usernames = await userService.find({
          query: {
              username: data.collaborators
          }
        })
        doesUserExist(usernames);
    }

    if(data.newName){
        name = data.newName
    }
    if(data.removeName){
        name = data.removeName
    }
    if(data.collaborators){
        name = data.nameOfComposition
    }
    if(data.newComposition){
        name = data.nameOfComposition
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



    context.id = listOfCollaborators[0]._id
    if(data.newName){
        //get list of previous active users
        let newActiveList = checkForDuplicates(listOfCollaborators, user.username);
        context.data = {
            active: newActiveList
        }
    }
    if(data.removeName){
        let removedActiveList = removeUser(listOfCollaborators, user.username);
        context.data = {
            active: removedActiveList
        }
    }
    if(data.collaborators){
        context.data = {
            collaborators: collab
        }
    }
    if(data.newComposition){
        context.data = {
            composition: data.newComposition
        }
    }

    return context;
  };
};
function removeUser(existingData, user){
    if(existingData[0].active.includes(user)){
        return existingData[0].active.replace(user,'')
    }
}

function checkForDuplicates(data, newActiveUser){
    if(!data[0].active.includes(newActiveUser)){
        return data[0].active + ',' + newActiveUser
    } else {
        return data[0].active
    }
}
function addToCollaboratorList (currentList, newUser) {
    if(currentList === '') {
        return newUser;
    } else {
        let tempList = [];
        tempList = currentList;
        tempList.push(newUser);
        return tempList;
    }
}

function compositionIsSaved(compositionList) {
    if (compositionList.data.length === 0) {
        throw new Error('Please make sure this composition has been saved')
    }
}

function isNewCollabThere(listCollab, newCollab) {
    if(listCollab[0].collaborators.indexOf(newCollab) !== -1){
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
