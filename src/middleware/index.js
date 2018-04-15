// eslint-disable-next-line no-unused-vars

module.exports = function (app) {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  app.on('logout', (authResult, connection ) => {
    let user = connection.connection.user.username;
    if(connection.socket.disconnected === true){
        //remove from active users
        app.service('active').remove(null,
          { query: { user: user }
        });
    } else {
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
