const express = require('express');
const bodyParser = require("body-parser");
let mongoose = require("mongoose");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use(express.static("public"));

require('./sockets/todo-sockets')(io);

//mongo database connection
mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://mingsicket:password123456@ds033679.mlab.com:33679/heroku_jjfd3b5s",
    //"mongodb://mingDatabase:password123456@dbh35.mlab.com:27357/heroku_mhzj4w0n",
    {
        userMongoClient: true
    }
);
//mongoose.connect("mongodb://localhost/ToDoDBSocket",{useNewUrlParser: true});

//routes
//////////////////////api///////////////////////////

require('./routes/api_routes.js')(app);

//////////////////////////////

server.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
})



