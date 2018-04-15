// eslint-disable-next-line no-unused-vars
const logger = require('winston');

module.exports = function (app) {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  app.on('logout', (authResult, connection ) => {
    logger.info('someone logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('someone logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    let user = connection.connection.user.username;
    console.log(user);
    if(connection.socket.disconnected === true){
        console.log('someone disconnected offfffffffffffffffffffff');
        //remove from active users
        app.service('active').remove(null,
          { query: { user: user }
        });
    } else {
      console.log('someone legit logged offfffffffffffffffffffff');
      // remove them from active users of composition and active users table
      app.service('compositions').patch('', {
        removeAll: user
      });
      app.service('active').remove(null,
        { query: { user: user }
      });
    }
  });
};
