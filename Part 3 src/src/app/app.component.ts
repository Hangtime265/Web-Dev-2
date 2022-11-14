//Matt Hanger - PROG2002 - Assignment 2

import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { BookData } from './BookData';

@Component({
  selector: 'app-root',
  template: ` <h3>Browse our online store below</h3><br><br>
            List of all Books <input type ="button" value="Show Book List" (click)="getBooks()"><br><br>
            <ul *ngFor="let book of bookList">
              <li><b>Book ID:</b> {{book.Book_ID}}</li>
              <li><b>Title:</b> {{book.Title}}</li> 
              <li><b>Author:</b> {{book.Author}}</li>
              <li><b>Price($):</b> {{book.Price}}</li>
              <li><b>Description:</b> {{book.Description}}</li>
              <li><b>Category ID:</b> {{book.Category_ID}}</li>
              <br>
            </ul>
            {{errorMessage}}
            `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Bookstore';

  bookList:BookData[]=new Array();
  errorMessage:string="";

  constructor(private dataService:DataService){

  }

  getBooks(){
    this.dataService.getBooks().subscribe(
      (d:any)=>{
        this.bookList=d;

      }, (err:any)=>{
        this.errorMessage="No Books Found";
      }
    );
  }
}
