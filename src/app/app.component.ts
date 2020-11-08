import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todo = ['Buy milk', 'Create a taskboard'];
  inProgress = [];
  done = [];

  drop(event: CdkDragDrop<string[], any>) {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addItem(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.todo.push(input.value);

    input.value = '';
  }
}
