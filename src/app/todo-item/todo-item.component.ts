import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../to-do.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  
  @Input() todo!: Todo;
  @Input() index!: number;
  @Output() completeTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<number>();
  @Output() saveTask = new EventEmitter<number>();
  @Output() cancelEdit = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();

  onCompleteTask() {
    this.completeTask.emit(this.index);
  }

  onEditTask() {
    this.editTask.emit(this.index);
  }

  onSaveTask() {
    this.saveTask.emit(this.index);
  }

  onCancelEdit() {
    this.cancelEdit.emit(this.index);
  }

  onDeleteTask(event: MouseEvent) {
    const isConfirmed = confirm('Are you sure you want to delete this task?');
    if (isConfirmed && ((event.target as HTMLElement).tagName === 'BUTTON')) {
      this.deleteTask.emit(this.index);
    }
  }  

}
