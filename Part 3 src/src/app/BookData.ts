//Matt Hanger - PROG2002 - Assignment 2

export class BookData {
	Book_ID: number;
	Title:string;
	Author:string;
	Price:number;
	Description:string;
	Category_ID:number;

	constructor(b:number, t:string, a:string, p:number, d:string, c:number) {

		this.Book_ID=b;
		this.Title=t;
		this.Author=a;
		this.Price=p;
		this.Description=d;
		this.Category_ID=c;
	}
}