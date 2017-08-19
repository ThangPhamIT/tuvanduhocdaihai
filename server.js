//======== express ========//
var express         = require('express');
var path            = require('path');
var app             = express();
var port            = process.env.PORT || 8000; // process.env.NODE_ENV

//middleware
require('./config')(app);

// route our app
var router = require('./app/routes');
app.use('/', router);

//set static files (scc, img, ...) location
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app/upload')));

// start the server
app.listen(port, function(){
    console.log('Start education website at port ' + port);
});

