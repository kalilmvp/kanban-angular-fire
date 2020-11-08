import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {AngularFirestore} from '@angular/fire/firestore';
import {Component} from '@angular/core';
import {log} from 'util';

interface Task {
  id?: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todo = this.store.collection<Task>('todo').valueChanges({idField: 'id'});
  inProgress = this.store.collection<Task>('inProgress').valueChanges({idField: 'id'});
  done = this.store.collection<Task>('done').valueChanges({idField: 'id'});

  constructor(
    private store: AngularFirestore) {
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      return;
    } else {
      this.store.firestore.runTransaction(() => Promise.all([
        this.store.collection(event.previousContainer.id).doc(event.previousContainer.data[event.previousIndex].id).delete(),
        this.store.collection(event.container.id).add(event.previousContainer.data[event.previousIndex])
      ])).then(r => console.log('Transferred'));
    }
  }

  addItem(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    // this.todo.push(input.value);

    this.store.collection<Task>('todo').add({
      title: input.value,
      description: input.value
    }).then(r => console.log('Task added'));

    input.value = '';
  }
}
