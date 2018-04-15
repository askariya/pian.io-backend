module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    //check for duplicates
    const activeService = context.app.service('active')
    const activeUsers = await activeService.find({
      query: {
        user: data.user
      }
    })

    let numDuplicates = checkForDuplicates(activeUsers.data, data.user)
    if (numDuplicates === 0){
        context.data = {
            user: data.user
        };
    }

    return context;
  };
};
// This function is used to remove a user from the list of active users
function checkForDuplicates(activeUsers, user ) {
  let count = 0;
  console.log('in duplcautes-------------------------', activeUsers, activeUsers.length)
  if(activeUsers.length === 0){
      return 0
  } else {
     throw new Error('person has already logged in')
  }
}
