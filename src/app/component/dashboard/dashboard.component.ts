import { Component, Input, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  addTaskValue: string = '';
  editTaskValue: string = '';

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get the list.");
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.id = uuidv4();
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
        alert(err);
      }
    );
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to edit task");
    });
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to delete")
    })
  }

  initEdit(task: Task) {
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }
}
