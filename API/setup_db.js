// Matt Hanger - PROG2002 - Assignment 2

var dbcon = require("./bookstore_db");
var express= require('express');

var connection=dbcon.getconnection();
connection.connect((err)=> {
	if(err) throw err;
	console.log("Connected");
});

// create tables for book 
connection.query('CREATE TABLE category (Category_ID int,Name varchar(255), Primary Key(Category_ID))', (err,result)=>{
	if(err) throw err;
	console.log('Category Table created');
})
// create tables for category 
connection.query('CREATE TABLE book (Book_ID int NOT NULL AUTO_INCREMENT, Title varchar(255), Author varchar(255), Price int, Description varchar(255), Category_ID int, Primary Key(Book_ID), Foreign Key(Category_ID) References category(Category_ID))', (err,result)=>{
	if(err) throw err;
	console.log('Book Table created');
})
// apply auto increment 
connection.query('Alter Table book AUTO_INCREMENT = 100', (err,result)=>{
	if(err) throw err;
	console.log("auto increment set");
})

// do the insert operation for category table
var values = [
	[1, 'Drama'],
	[2, 'Action'],
	[3, 'Romance'],
	[4, 'Kids'],
	[5, 'Education']];
connection.query('INSERT INTO category (Category_ID, Name) VALUES ?',[values], (err,result) => {
	if(err) throw err;
	console.log('number of records inserted: ', result.changedRows);
});

// do the insert operation for book table 
var books = [
	[101, 'The Girl Who Fell From The Sky', 'Emma Carey', 24.75, 'An extraordinaty true story of resilience, courage, hope and finding lightness after the heaviest of landings', 1],
	[102, 'No Finish Line', 'Johnny Ruffo', 24.99, 'A rags-to-riches memoir of a cheeky tradie who stole Australias hearts on The X Factor and Home and Away', 2],
	[103, 'Not Now, Not Ever', 'Julia Gillard', 27.75, 'Ten years on from the misogyny speech', 3],
	[104, 'Girl Crush', 'Florence Given', 26.25, 'In Givens debut novel, we follow Eartha on a wild, weird and seductive modern-day exploration as she commences life as an openly bisexual woman whilst also becoming a viral sensation', 4],
	[105, 'The Couple Upstairs', 'Holly Wainwright', 26.25, 'Five months after Mel told her husband to leave, a ghost moved in upstairs', 5],
	[106, 'The Ink Black Heart', 'Robert Galbraith', 24.75, 'When frantic, dischevelled Edie Ledwell appers in the office begging to speak to her, private detective Robin Ellacott doesnt know quite what to make of the situation', 1],
	[107, 'Exiles', 'Jane Harper', 24.75, 'At a busy festival site on a warm spring night, a baby lies along in her pram, her mother vanishing into the crowds', 2],
	[108, 'RecipeTin Eats: Dinner', 'Nagi Maehashi', 34.50, '150 dinner recipes. Fail-proof. Delicious. Addictive.', 3],
	[109, 'The Guy Who Decides', 'Jimmy Rees', 22.50, 'Australias funniest social media sensation', 4],
	[110, 'The Final Gambit', 'Jennifer Lynn Barnes', 14.95, 'The thrilling conclusion to the international bestselling, BookTok sensation, Inheritance Games trilogy, where Knives Out meets One of Us is Lying', 5]];
connection.query('INSERT INTO book (Book_ID, Title, Author, Price, Description, Category_id) VALUES ?',[books], (err,result) => {
	if(err) throw err;
	console.log('number of books inserted: ',result.changedRows);
});