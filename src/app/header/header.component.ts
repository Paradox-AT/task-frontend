import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoService } from '../task.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../task';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  taskDetails: FormGroup;

  private todoService = inject(TodoService);
  walletConnected: boolean

  constructor() {
    this.taskDetails = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    })
    this.walletConnected = false
  }
  async connectMetamask() {
    await this.todoService.connectMetamask()
    this.walletConnected = this.todoService.walletConnected
  }

  async createTask() {
    this.todoService.createTask({
      id: 0,
      title: this.taskDetails.value.title,
      description: this.taskDetails.value.description,
      assignedUser: "",
      status: TaskStatus.Pending,
    })
    this.taskDetails.reset()
  }

}
