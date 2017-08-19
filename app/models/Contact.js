var db = require('./db');

var Contact = {
    createContact: function (message, callback) {
        db.query('insert into public."Contact"(full_name, address, phone, email, message) values($1, $2, $3, $4, $5)',
        [message.full_name, message.address, message.phone, message.email, message.message],
        function(err, result){
            callback(err);
        })
    },
};

module.exports = Contact;