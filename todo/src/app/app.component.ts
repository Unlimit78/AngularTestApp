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
  public todolist  :TodoInterface[];
  private httpClient : HttpClient;
  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json'
  })
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

  }

  ngOnInit(): void{
    this.httpClient.get<TodoInterface[]>('http://127.0.0.1:8000/task/',{headers:this.httpHeaders}).subscribe(todolist => {
      this.todolist = todolist;

    })

  }
}
