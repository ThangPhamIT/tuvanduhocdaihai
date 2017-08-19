var Class = require('../models/Class');

var homeController = {
    index: function (req, res) {
        res.render('home/trang-chu', {
        });
    }
};

module.exports = homeController;