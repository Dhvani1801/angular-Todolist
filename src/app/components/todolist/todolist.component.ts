import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({  
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
 
  todolist!: Todo[];
  constructor(private todoServices:TodoService) { }

  ngOnInit() {
    this.todoServices.gettodolist().subscribe(todolist => {
      this.todolist = todolist;
    } );
  }

  deleteTodo(todo:Todo){
    //Remove From UI
    this.todolist = this.todolist.filter(t => t.id !== todo.id);
    //Remove From server
    this.todoServices.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo){
    this.todoServices.addTodo(todo).subscribe(todo => {
      this.todolist.push(todo);
    });
  }

}
