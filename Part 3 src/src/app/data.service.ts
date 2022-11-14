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
}