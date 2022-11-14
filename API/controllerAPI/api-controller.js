// Matt Hanger - PROG2002 - Assignment 2

var dbcon = require("../bookstore_db");
var express= require('express');
var router = express.Router();
var connection=dbcon.getconnection();
connection.connect();

// get API
router.get("/",(request,res)=>{
	connection.query("select * from book", (err,records,fields)=>{
		if(err){
			console.log("Error while retrieving data from the database");
			console.log(err);
		} else {
			res.send(records);
		}
	})
})

// get specefic category id API
router.get("/:categoryid", (request, res)=>{
	connection.query("select * from book where Category_ID=" + request.params.categoryid, (err, records,fields)=> {
		 if (err){
			 console.log("Error while retrieve the data");
			 console.log(err);
		 }else{
			 res.send(records);
		 }
	})
})

//insert API
router.post("/", (request, res)=>{ 
	var title = request.body.Title;
	var author = request.body.Author;
	var price = request.body.Price;
	var description = request.body.Description;
	var categoryid = request.body.Category_ID;
//insert the form parameters into the database  
	connection.query("INSERT INTO book VALUES (NULL, '"+title+"', '"+author+"', '"+price+"', '"+description+"', '"+categoryid+"')", (err, records,fields)=> {
		 if (err){
			 console.log("Error while inserting the data");
			 console.log(err);
		 }else{
			 res.send({insert: "success"});
		 }
	})
})

// Update API
router.put("/", (request, res)=>{
	var bookid = request.body.Book_ID;
	var title = request.body.Title;
	var author = request.body.Author;
	var price = request.body.Price;
	var description = request.body.Description;
	var categoryid = request.body.Category_ID;
//insert the form parameters into the database  
	connection.query("UPDATE book SET Title='"+title+"', Author='"+author+"', Price='"+price+"', Description='"+description+"', Category_ID='"+categoryid+"' WHERE Book_ID = " + bookid, (err, records,fields)=> {
		 if (err){
			 console.log("Error while updating the data");
			 console.log(err);
		 }else{
			 res.send({update: "success"});
		 }
	})
})

// Delete API
router.delete("/:bookid", (request, res)=>{
//insert the form parameters into the database  
	connection.query("DELETE FROM book WHERE Book_ID = " + request.params.bookid, (err, records,fields)=> {
		 if (err){
			 console.log("Error while deleting the data");
			 console.log(err);
		 }else{
			 res.send({delete: "success"});
		 }
	})
})


module.exports=router;