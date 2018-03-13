const url = require('url');
const MongoClient = require('mongodb').MongoClient;
//remote test database: "mongodb": "mongodb+srv://pianio:pian.ioackkls@cluster0-dmkif.mongodb.net/test"
//local database: "mongodb": "mongodb://localhost:27017/pian_io_backend"
module.exports = function (app) {
  const config = app.get('mongodb');
  const dbName = url.parse(config).path.substring(1);
  const promise = MongoClient.connect(config).then(client => {
    // For mongodb <= 2.2
    if(client.collection) {
      return client;
    }
    
    return client.db(dbName);
  });

  app.set('mongoClient', promise);
};
