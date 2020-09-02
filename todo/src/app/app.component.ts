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
    this.httpClient.get<TodoInterface[]>('http://127.0.0.1:8000/api',{headers: this.httpHeaders}).subscribe(todolist => {
      this.todolist = todolist;

    })

  }

  CreateTask():void {
    if(this.title){
      this.data = {
        title:this.title,
        completed: false,

      }
      this.httpClient.post<TodoInterface>('http://127.0.0.1:8000/api',this.data).subscribe(todo => {

      this.todolist.push(todo);

    })

    }
  }

  DeleteTask(id):void{

    this.httpClient.delete<TodoInterface>('http://127.0.0.1:8000/api/'+id).subscribe(todo => {
        this.ngOnInit();


    })
  }

  ChangeStatus(todo): void{

    todo.completed = !todo.completed;
    this.httpClient.put<TodoInterface>('http://127.0.0.1:8000/api/'+todo.id+'/',todo).subscribe(todo => {
        this.ngOnInit();


    })
  }

}
