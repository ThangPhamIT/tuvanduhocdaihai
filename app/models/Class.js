var db = require('./db');

var Class = {
    findAll: function (callback) {
      db.query('select * from public."ClassInfo" ', [], 
      function(err, result){
          if (err) {
            return console.error ('error running query', err);
          }
          console.log(JSON.stringify(result.rows));
          callback(err, result.rows);
      });
    },

    getClassById: function(id, callback){
      db.query('select * from public."ClassInfo" where id = $1', [id], 
      function(err, result){
          console.log(JSON.stringify(result.rows[0]));
          callback(err, result.rows[0]);
      })
    }
};

module.exports = Class;