import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  @Input()todo!: Todo;
  @Output() deleteTodo:EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  setClasses(){
    let Classes={
      todo:true,
      'is-complete':this.todo.completed
    }
    return Classes;
  }

  onToggle(todo: any){
    // Toggle in UI
    todo.completed = !todo.completed;
    console.log('toggle');
    // Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => 
      console.log(todo));
    }
  

  onDelete(todo: any){
    this.deleteTodo.emit(todo);
  }

}
