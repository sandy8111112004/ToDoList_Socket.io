const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
require('./sockets/todo-sockets')(io);

//mongo database connection
mongoose.Promise = global.Promise;
// mongoose.connect(
//     process.env.MONGODB_URI || "mongodb://mingDatabase:password123456@dbh35.mlab.com:27357/heroku_mhzj4w0n",
//     {
//         userMongoClient: true
//     }
// );
mongoose.connect("mongodb://localhost/ToDoDB",{useNewUrlParser: true});

//routes
//////////////////////api///////////////////////////

require('./routes/api_routes.js')(app);

//require('./routes/api-routesClass.js')(app);          //still got some error now

//////////////////////////////


app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
})



