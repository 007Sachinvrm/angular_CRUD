import { Component } from '@angular/core';
import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  title = 'angular-drag-drop';
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep', 'Brush teeth', 'Get up', 'Take a shower', 'Check e-mail', 'Walk dog'];
  done: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadSavedElements(); // Load saved elements when the component initializes
  }

  // loadSavedElements() {
  //   this.userService.getSavedElements().subscribe((response: any) => {
  //     if (response && response.elements) {
  //       this.done = response.elements; // Prefill the done array with saved elements
  //     }
  //   });
  // }

    loadSavedElements() {
    this.userService.getSavedElements().subscribe((response: any) => {
      if (response && response.elements) {
        this.done = response.elements; // Prefill the done array with saved elements
        console.log('Loaded elements:', this.done);
      }
    }, error => {
      console.error('Error fetching saved elements:', error);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container && event.container.id === 'done') {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Method to save the dragged elements in the right container
  saveElements() {
    const elementsToSave = {
      elements: this.done
    };

    // Call the service to save elements
    this.userService.saveDraggedElements(elementsToSave).subscribe(response => {
      console.log('Elements saved successfully:', response);
    }, error => {
      console.error('Error saving elements:', error);
    });
  }
}
