module.exports = function (options = {}) {
  return async context => {
    console.log('in remove -------------------------')
    const { data } = context;

    //check for duplicates
    const activeService = context.app.service('active')
    console.log('in remove -------------------------')
    const activeUsers = await activeService.find({
      query: {
        user: data.user
      }
    })
    console.log('in remove -------------------------')
    let numDuplicates = checkForExistence(activeUsers.data)
    console.log('in remove -------------------------')
    context.id = activeUsers.data[0]._id

    return context;
  };
};
// This function is used to remove a user from the list of active users
function checkForExistence(activeUsers) {
  let count = 0;
  console.log('in check existence-------------------------', activeUsers, activeUsers.length)
  if(activeUsers.length === 0){
      return 0
  } else {
     throw new Error('no person to remove')
  }
}
