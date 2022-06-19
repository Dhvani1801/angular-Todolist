import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  todolistUrl:string = 'https://jsonplaceholder.typicode.com/todos';

  todolistlimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  // Get Todolist
  gettodolist():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todolistUrl}${this.todolistlimit}`);
    
  }

  //Delete Todo
  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.todolistUrl}/${todo.id}`;
    return this.http.delete<Todo>(url,httpOptions);
  }

  //Add Todo
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todolistUrl,todo,httpOptions);
  }

  // Toggle Comleted
  toggleCompleted(todo:Todo):Observable<any>
  {
    const url = `${this.todolistUrl}/${todo.id}`;
    return this.http.put(url,todo,httpOptions);
  }
}
