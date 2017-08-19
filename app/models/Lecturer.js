var db = require('./db');

var Lecturer = {
    findAll: function (callback) {
      db.query('select * from public."Lecturer" order by id', [], function(err, result){
          if (err) {
            return console.error ('error running query', err);
          }
          console.log(JSON.stringify(result.rows));
          callback(err, result.rows);
      });
    },

    createLecturer: function (lecturer, callback) {
        db.query('insert into public."Lecturer"(full_name, address, phone, email, education_name, major_name, account_name, password, level_degree, teaching_area, class_name, subject_name, number_of_time, note)' +
        ' values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
        [lecturer.full_name, lecturer.address, lecturer.phone, lecturer.email, lecturer.education_name, lecturer.major_name,
        lecturer.account_name, lecturer.password, lecturer.level_degree, lecturer.teaching_area, lecturer.class_name, lecturer.subject_name, lecturer.number_of_time, lecturer.note],
        function(err, result){
            callback(err);
        })
    }
};

module.exports = Lecturer;