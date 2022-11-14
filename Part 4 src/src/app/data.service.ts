//Matt Hanger - PROG2002 - Assignment 2

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookData } from './BookData';

@Injectable()

export class DataService{

	private url:string = "http://23508024.it.scu.edu.au/server/"; //http://localhost:3060/api/bookstore/";
	constructor(private http:HttpClient){
	}

	public getBooks():Observable<BookData>{
		return this.http.get<BookData>(this.url);
	}

	public getBookByID(categoryid:number):Observable<BookData>{
		return this.http.get<BookData>(this.url+categoryid);
	}

	public deleteBook(bookid:number):Observable<BookData>{
		return this.http.delete<BookData>(this.url+bookid);
	}

	public updateBook(bookid:number, title:string, author:string, price:number, description:string, categoryid:number):Observable<BookData>{
		return this.http.put<BookData>(this.url, {"bookid":bookid, "title":title, "author":author, "price":price, "description":description, "categoryid":categoryid});
	}

	public insertBook(title:string, author:string, price:number, description:string, categoryid:number):Observable<BookData>{
		return this.http.post<BookData>(this.url, {"Title":title, "Author":author, "Price":price, "Description":description, "Category_ID":categoryid});
	}

}