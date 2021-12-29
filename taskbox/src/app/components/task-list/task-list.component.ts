import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TasksState, ArchiveTask, PinTask } from 'src/app/state/task.state';

@Component({
  selector: 'app-task-list',
  template: `
    <app-pure-task-list
      [tasks]="tasks$ | async"
      (onArchiveTask)="archiveTask($event)"
      (onPinTask)="pinTask($event)"
    ></app-pure-task-list>
  `,
})
export class TaskListComponent {
  @Select(TasksState.getAllTasks) tasks$: Observable<Task[]>;

  constructor(private store: Store) {}

  /**
   * Component method to trigger the archiveTask event
   */
  archiveTask(id: string) {
    this.store.dispatch(new ArchiveTask(id));
  }

  /**
   * Component method to trigger the pinTask event
   */
  pinTask(id: string) {
    this.store.dispatch(new PinTask(id));
  }
}