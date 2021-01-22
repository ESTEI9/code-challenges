import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Taco } from 'src/app/interfaces/taco';
import * as _ from 'lodash';
import { RecipeItem } from 'src/app/interfaces/recipe-item';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-edit-taco',
  templateUrl: './edit-taco.component.html',
  styleUrls: ['./edit-taco.component.scss']
})
export class EditTacoComponent implements OnInit, OnChanges {

  @Input() taco!: Taco;
  @Input() editing!: {state: boolean};
  @Output() update: EventEmitter<Taco> = new EventEmitter<Taco>();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  public localTaco!: Taco;
  public shells = ['Soft Corn', 'Hard Corn', 'Whole Wheat', 'Flour'];
  public proteins = ['Beef', 'Chicken', 'Tofu', 'Al Pastor'];
  public toppings = ['Mozarella', 'Lettuce', 'Tomato', 'Cilantro', 'Onion', 'Chile Powder', 'Sour Cream'];
  public sauces = ['Verde', 'Red Sauce', 'Spicy Red Sauce', 'Mole'];

  constructor(
    public dialog: MatDialog,
    public drawer: MatSidenav
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.taco) { this.localTaco = _.cloneDeep(changes.taco.currentValue); }
    if(changes.editing) { this.editing = changes.editing.currentValue; }
    console.log(changes);
  }

  isObject(val: any): boolean { return typeof val === 'object'; }

  editTaco() {
    if(this.editing.state) { //save Taco
      if(JSON.stringify(this.localTaco) !== JSON.stringify(this.taco)) {
        this.update.emit(this.localTaco);
      } else {
        this.drawer.close();
      }
    }
    this.editing.state = !this.editing.state;
  }

  deleteTaco() {
    const dialog = this.dialog.open(DeleteDialogComponent);
    dialog.afterClosed().subscribe(res => {
      if(res) {
        this.delete.emit();
      }
    });
  }

  updateItems(type: string, item: {index: number, ritem: RecipeItem}) {
    switch(type) {
      case 'proteins':
        this.localTaco.recipe.proteins.splice(item.index, 1, item.ritem);
        break;
      case 'sauces':
        this.localTaco.recipe.sauces?.splice(item.index, 1, item.ritem);
        break;
      case 'toppings':
        this.localTaco.recipe.toppings?.splice(item.index, 1, item.ritem);
        break;
      default:
    }
  }

  deleteItem(type: string, index:number) {
    switch(type) {
      case 'proteins':
        this.localTaco.recipe.proteins.splice(index, 1);
        break;
      case 'sauces':
        this.localTaco.recipe.sauces?.splice(index, 1);
        break;
      case 'toppings':
        this.localTaco.recipe.toppings?.splice(index, 1);
        break;
      default:
    }
  }
}

@Component({
  selector: 'dialog-delete',
  template: `<mat-dialog-content>
    Are you sure you want to delete this taco?
  </mat-dialog-content>
  <mat-dialog-actions align="center">
    <button mat-button [mat-dialog-close]="true">Yes</button>
    <button mat-button color="primary" mat-dialog-close cdkFocusInitial> No</button>
  </mat-dialog-actions>`
})
export class DeleteDialogComponent {
}