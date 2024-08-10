import { Component } from '@angular/core';
import { TodoListComponent } from "./to-do-list/to-do-list.component";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent, TodoItemComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';
}
