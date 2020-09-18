import { Component,OnInit } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import get = Reflect.get;
import {CategoryInterFace, TodoInterface} from "./todoInterface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  public formOpened : false;

  public todo :{
    id:number,
    title:string,
    category:number,
    completed:boolean
  }
  public title : '';
  public data : {};
  public categoryData:{};

  public todolist  :TodoInterface[];
  public chosenCategory: number;
  public newCategory:string;
  public categories: CategoryInterFace[];


  private httpClient : HttpClient;
  httpHeaders = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.chosenCategory = 1;
  }


  ngOnInit(): void{
    this.httpClient.get<TodoInterface[]>('http://127.0.0.1:8000/api/task',{headers: this.httpHeaders}).subscribe(todolist => {
      this.todolist = todolist;


    })
    this.httpClient.get<CategoryInterFace[]>('http://127.0.0.1:8000/api/category',{headers:this.httpHeaders}).subscribe(categories=>{
      this.categories = categories;
    })

  }

  ChangeCategory():void{
    if(this.title) {
      this.categoryData = {
        name: this.newCategory
      }
      if (!this.categories.find(x=>x.name===this.newCategory)) {
        this.httpClient.post<CategoryInterFace>('http://127.0.0.1:8000/api/category/', this.categoryData).subscribe(category => {

          this.categories.push(category);
          this.ChangeTitle(category);


        })
      }
      else{
        this.ChangeTitle(this.categories.find(x=>x.name===this.newCategory))
      }
    }
  }

  CreateCategory():void{
    if(this.title) {
      this.categoryData = {
        name: this.newCategory
      }
      if (!this.categories.find(x=>x.name===this.newCategory)) {
        this.httpClient.post<CategoryInterFace>('http://127.0.0.1:8000/api/category/', this.categoryData).subscribe(category => {

          this.categories.push(category);
          this.CreateTask(category);


        })
      }
      else{
        this.CreateTask(this.categories.find(x=>x.name===this.newCategory))
      }
    }


  }

  CreateTask(category):void {


      this.data = {
        title:this.title,
        completed: category.name==='Done' ? true : false,
        category: category.id
      }


      this.httpClient.post<TodoInterface>('http://127.0.0.1:8000/api/task/',this.data).subscribe(todo => {

      this.todolist.push(todo);

    })



    this.title = '';
      this.newCategory ='';
  }

  DeleteTask(todo):void{
    todo.category = this.categories.find(x=>x.name==='Deleted').id;
    this.httpClient.put<TodoInterface>('http://127.0.0.1:8000/api/task/'+todo.id+'/',todo).subscribe(todo => {
        this.ngOnInit();


    })
  }

  ChangeStatus(todo): void{

    todo.completed = !todo.completed;
    if (todo.completed){
      todo.category = this.categories.find(x=>x.name==='Done').id  ;
    }
    else{
      todo.category = this.categories.find(x=>x.name==='In progress').id;
    }


    this.httpClient.put<TodoInterface>('http://127.0.0.1:8000/api/task/'+todo.id+'/',todo).subscribe(todo => {
        this.ngOnInit();


    })

  }

  ChangeTitleForm(formOpened,todo):void {

    this.todo = todo;



    this.formOpened = formOpened;



  }

  ChangeTitle(category):void{

    if(this.title){
      this.todo.title = this.title;
      this.todo.category = category.id;
      this.todo.completed = category.name==='Done' ? true : false,

      this.httpClient.put<TodoInterface>('http://127.0.0.1:8000/api/task/'+this.todo.id+'/',this.todo).subscribe(todo => {
        this.ngOnInit();



    })
    }
    this.title = '';
    this.newCategory = '';
    this.formOpened = false;
  }

}
