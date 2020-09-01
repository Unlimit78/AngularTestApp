import { Component,OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import get = Reflect.get;
import {TodoInterface} from "./todoInterface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = '';
  public data = {};
  public todolist  :TodoInterface[];
  private httpClient : HttpClient;
  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json'
  })
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

  }

  ngOnInit(): void{
    this.httpClient.get<TodoInterface[]>('http://127.0.0.1:8000/',{headers: this.httpHeaders}).subscribe(todolist => {
      this.todolist = todolist;

    })

  }

  CreateTask():void {
    if(this.title){
      this.data = {
        title:this.title,
        completed: false,

      }
      this.httpClient.post<TodoInterface>('http://127.0.0.1:8000/',this.data).subscribe(todo => {
        console.log(this.title);
      this.todolist.push(todo);

    })

    }
  }

}
