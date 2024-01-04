import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../task';
import { TodoService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, CommonModule, MatButtonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent {
  private todoService = inject(TodoService);
  @Input() task!: Task;

  userAddress = ''

  async assignUser() {
    await this.todoService.assignUser(this.task.id, this.userAddress)
  }

  async markTaskCompleted() {
    await this.todoService.markTaskCompleted(this.task.id)
  }

}
