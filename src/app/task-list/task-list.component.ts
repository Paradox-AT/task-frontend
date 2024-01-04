import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TaskItemComponent } from '../task-item/task-item.component'
import { TodoService } from '../task.service';
import { Task } from '../task';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private todoService = inject(TodoService);
  tasks?: Task[]

  async ngOnInit() {
    this.getTasks()
    setTimeout(() => { this.ngOnInit() }, 1000 * 15)
  }

  async getTasks() {
    let tasks = await this.todoService.getTasks();
    this.tasks = Object.values(tasks)
    console.log("this.tasks", this.tasks);

    return this.tasks
  }

}
