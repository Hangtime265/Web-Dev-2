// Matt Hanger - PROG2002 - Assignment 2

var express = require("express");

var server = express(); //web server 

var bookstoreAPI = require("./controllerAPI/api-controller");

var bodyparser = require("body-parser");

var cors = require('cors')
server.use(cors())

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended:false}));

//api application can be accessed in this url: http://localhost:3060/api/bookstore,
//not http://localhost:3060
server.use("/api/bookstore", bookstoreAPI);

server.listen(3060);

console.log("Server is up and running");