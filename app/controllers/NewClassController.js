var Class = require('../models/Class');

var newClassController = {
    index: function (req, res) {
        Class.findAll(function(err, classes){
            res.render('new-class/lop-moi', {
                classes: classes
            });
        });
    },

    detailClass: function (req, res) {
        Class.getClassById(req.params.id, function(err, classInfo){
            res.render('new-class/chi-tiet-lop-moi', {
                classInfo: classInfo
            });
        });
    }
};

module.exports = newClassController;