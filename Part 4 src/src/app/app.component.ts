//Matt Hanger - PROG2002 - Assignment 2

import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { BookData } from './BookData';

@Component({
  selector: 'app-root',
  template: ` 
            <h4>List of all Books</h4> <input type ="button" value="Show Book List" (click)="getBooks()"><br><br>
            <p style="color:red">{{errorMessage}}</p>
            <ul *ngFor="let book of bookList">
              <li><b>Book ID:</b> {{book.Book_ID}}</li>
              <li><b>Title:</b> {{book.Title}}</li> 
              <li><b>Author:</b> {{book.Author}}</li>
              <li><b>Price($):</b> {{book.Price}}</li>
              <li><b>Description:</b> {{book.Description}}</li>
              <li><b>Category ID:</b> {{book.Category_ID}}</li>
              <li><button name="button" id="id_deleted" (click)="deleteBook(book.Book_ID)" >Remove</button></li>
              <br>
            </ul>
            <p style="color:red">{{errorMessage}}</p><br><br>

            <h4>Add a new book:</h4><p>Enter the details of the book you wish to add, a new Book ID will automatically be generated</p>
            Title: <input type="text" [(ngModel)]=newtitle><br>
            Author: <input type="text" [(ngModel)]=newauthor><br>
            Price: <input type="text" [(ngModel)]=newprice><br>
            Description: <input type="text" [(ngModel)]=newdescription><br>
            Category ID: <input type="text" [(ngModel)]=newcategoryid><br>
            <input type="button" value="Save" (click)="insertBook()"><br>
            <p style="color:red">{{errorMessage2}}</p>
            <p style="color:green">{{message}}</p><br><br>

            <h4>Update an exisitng book:</h4><p> Enter the Book ID of the book you wish to update, then enter the details you wish to update </p>
            Book ID: <input type="text" [(ngModel)]=bookid_update><br>
            Title: <input type="text" [(ngModel)]=title_update><br>
            Author: <input type="text" [(ngModel)]=author_update><br>
            Price: <input type="text" [(ngModel)]=price_update><br>
            Description: <input type="text" [(ngModel)]=description_update><br>
            Category ID: <input type="text" [(ngModel)]=categoryid_update><br>
            <input type="button" value="Save" (click)="updateBook()"><br>
            <p style="color:red">{{errorMessage3}}</p>
            <p style="color:green">{{message2}}</p><br><br>
            `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Bookstore';

  bookList:BookData[]=new Array();
  errorMessage:string="";
  errorMessage2:string="";
  errorMessage3:string="";
  message:string="";
  message2:string="";

  newbookid:string="";
  newtitle:string="";
  newauthor:string="";
  newprice:string="";
  newdescription:string="";
  newcategoryid:string="";

  bookid_update:string="";
  title_update:string="";
  author_update:string="";
  price_update:string="";
  description_update:string="";
  categoryid_update:string="";


  constructor(private dataService:DataService){

  }

  getBooks(){
    this.dataService.getBooks().subscribe(
      (d:any)=>{
        this.errorMessage="";
        this.bookList=d;
      }, (err:any)=>{
        this.errorMessage="No Books Found";
      }
    );
  }

  deleteBook(id_deleted:number){
      this.dataService.deleteBook(id_deleted).subscribe(
        (d:any)=>{
          this.errorMessage="Book was removed";
          console.log(id_deleted);
        }, (err:any)=>{
          this.errorMessage="Delete was unsuccesful";
          console.log(err); 
        }
      );
  }

  insertBook(){
    if(this.newtitle == null || this.newtitle == "") {
      this.errorMessage2="Please insert a book Title";
    } else if(this.newauthor == null || this.newauthor == "") {
      this.errorMessage2="Please insert a book Author";
    } else if(this.newprice == null || this.newprice == "") {
      this.errorMessage2="Please insert a valid Price";
    } else if(this.newdescription == null || this.newdescription == "") {
      this.errorMessage2="Please insert a book Description";
    } else if(this.newcategoryid == null || this.newcategoryid == "") {
      this.errorMessage2="Please insert a valid Category ID";
    } else {this.dataService.insertBook(this.newtitle, this.newauthor, Number(this.newprice), this.newdescription, Number(this.newcategoryid)).subscribe(
        (d:any)=>{
          this.message="New Book was added";
          this.errorMessage2="";
        }, (err:any)=>{
          this.errorMessage2="Insertion was unsuccesful";
          this.message="";
          console.log(err); 
        }
      );
    }
  }

  updateBook(){
    if(this.bookid_update == null || this.bookid_update == "") {
      this.errorMessage3="Please insert the book id of the book you wish to update";
    } else if(this.title_update == null || this.title_update == "") {
      this.errorMessage3="Please insert a book Title";
    } else if(this.author_update == null || this.author_update == "") {
      this.errorMessage3="Please insert a book Author";
    } else if(this.price_update == null || this.price_update == "") {
      this.errorMessage3="Please insert a valid Price";
    } else if(this.description_update == null || this.description_update == "") {
      this.errorMessage3="Please insert a book Description";
    } else if(this.categoryid_update == null || this.categoryid_update == "") {
      this.errorMessage3="Please insert a valid Category ID";
    } else {this.dataService.updateBook(Number(this.bookid_update), this.title_update, this.author_update, Number(this.price_update), this.description_update, Number(this.categoryid_update)).subscribe(
        (d:any)=>{
          this.message2="Book was updated";
          this.errorMessage3="";
        }, (err:any)=>{
          this.errorMessage3="update was unsuccesful";
          this.message2="";
          console.log(err); 
        }
      );
    }
  }
}
