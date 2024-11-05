import { Component, ViewChildren, ViewChild, ElementRef, VERSION } from '@angular/core';
import { CdkDragDrop, copyArrayItem, CdkDragMove } from '@angular/cdk/drag-drop';
import { UserService } from '../services/user.service';
import { DraggableItem } from '../../data-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  title = 'angular-drag-drop';
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep', 'Brush teeth', 'Get up', 'Take a shower', 'Check e-mail', 'Walk dog'];
  todos = [
    { label: 'Get to work', x: 0, y: 0, 'z-index': 0 },
    { label: 'Pick up groceries', x: 0, y: 0, 'z-index': 0 },
    { label: 'Go home', x: 0, y: 0, 'z-index': 0 },
    { label: 'Fall asleep', x: 0, y: 0, 'z-index': 0 },
    { label: 'Get up', x: 0, y: 0, 'z-index': 0 },
    { label: 'Brush teeth', x: 0, y: 0, 'z-index': 0 },
    { label: 'Take a shower', x: 0, y: 0, 'z-index': 0 },
    { label: 'Check e-mail', x: 0, y: 0, 'z-index': 0 },
    { label: 'Walk dog', x: 0, y: 0, 'z-index': 0 },
  ];
  done: string[] = [];
  done1: DraggableItem[] = [];
  onDrag: boolean = false;
  off: any;
  _pointerPosition: any;
  posInside: { source: any; x: number; y: number } = {
    source: null,
    x: 0,
    y: 0,
  };
  scaleX = 100 / 200; 
  scaleY = 1;
  name = 'Angular ' + VERSION.major;

  @ViewChild('doneList', { read: ElementRef, static: true })
  dropZone!: ElementRef;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.loadSavedElements(); // Load saved elements when the component initializes
  }

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




//New Fuctions for Drag and Drop--------------------------

  changeZIndex(item: any) {
    this.done1.forEach((x) => (x['z-index'] = x == item ? 1 : 0));
  }

  moved(event: CdkDragMove) {
    this._pointerPosition = event.pointerPosition;
  }

  drop1(event: CdkDragDrop<any[]>, isDropZone: boolean = false) {
    if (event.previousContainer != event.container) {
      const data = event.previousContainer.data[event.previousIndex];
      const index = event.container.data.length;
        event.container.data.push({
          label: data.label,
          x:
            this._pointerPosition.x -
            this.off.x * this.scaleX -
            this.dropZone.nativeElement.getBoundingClientRect().left,
          y:
            this._pointerPosition.y -
            this.off.y * this.scaleY -
            this.dropZone.nativeElement.getBoundingClientRect().top,
          'z-index': 0,
        });
        event.item.data.y =
          this._pointerPosition.y -
          this.off.y * this.scaleY -
          this.dropZone.nativeElement.getBoundingClientRect().top;
        event.item.data.x =
          this._pointerPosition.x -
          this.off.x * this.scaleX -
          this.dropZone.nativeElement.getBoundingClientRect().left;
        this.changeZIndex(event.container.data[index]);
    }
    this.posInside = { source: null, x: 0, y: 0 };
  }

  changePosition(event: CdkDragDrop<any>, field: any) {
    const rectZone = this.dropZone.nativeElement.getBoundingClientRect();
    const rectElement =
      event.item.element.nativeElement.getBoundingClientRect();

    let y = +field.y + event.distance.y;
    let x = +field.x + event.distance.x;
    const out =
      y < 0 ||
      x < 0 ||
      y > rectZone.height - rectElement.height ||
      x > rectZone.width - rectElement.width;

    if (!out) {
      field.y = y;
      field.x = x;
      this.done1 = this.done1.sort((a, b) =>
        a['z-index'] > b['z-index'] ? 1 : a['z-index'] < b['z-index'] ? -1 : 0
      );
    } else {
      
      this.done = this.done.filter((x) => x != field);
    }
  }

  saveDoneList() {
    const payload = {
      elements: this.done1.map(item => ({
        label: item.label,
        x: item.x,
        y: item.y,
        zIndex: item['z-index']
      }))
    };
    
    this.http.post('http://localhost:3000/elements', payload).subscribe(
      response => {
        console.log('Save successful', response);
        // Optionally, add a notification here to inform the user of successful saving
      },
      error => {
        console.error('Save failed', error);
        // Optionally, show an error message here
      }
    );
  }

}
