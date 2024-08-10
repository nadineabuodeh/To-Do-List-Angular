import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { Todo, TodoService } from '../to-do.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TodoItemComponent],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class TodoListComponent implements OnInit {

  todoForm: FormGroup;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todos = this.todoService.getTask();
    this.filteredTodos = this.todos;
  }

  addTask(): void {
    if (this.todoForm.valid) {
      const title = this.todoForm.get('title')?.value;
      this.todoService.addTask(title, this.todos.length);
      this.todoForm.reset();
      this.loadTasks();
    } else {
      alert('Please enter a task');
    }
  }

  deleteTask(index: number): void {
    this.todoService.deleteTask(index);
    this.loadTasks();
  }  

  isComplete(index: number): void {
    this.todoService.isComplete(index);
    this.loadTasks();
  }

  editTask(index: number): void {
    this.todos[index].isEditing = true;
    this.todos[index].editTitle = this.todos[index].title;
  }

  saveTask(index: number): void {
    this.todos[index].title = this.todos[index].editTitle!;
    this.todos[index].isEditing = false;
    this.todoService.saveTasks();
    this.loadTasks();
  }

  cancelEdit(index: number): void {
    this.todos[index].isEditing = false;
  }

  searchTasks(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTodos = this.todos.filter(todo => todo.title.toLowerCase().includes(query));
  }
}
