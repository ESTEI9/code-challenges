import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RecipeItem } from 'src/app/interfaces/recipe-item';
import * as _ from 'lodash';

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.scss']
})
export class RecipeItemsComponent implements OnInit, OnChanges {

  @Input('label') label!: string;
  @Input('items') items?: RecipeItem[];
  @Input('options') options?: string[];
  @Output() update: EventEmitter<{index: number, ritem: RecipeItem}> = new EventEmitter<{index: number, ritem: RecipeItem}>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  public units = ['Cups', 'Tbsp', 'Tsp', 'Dollop', 'Pinch'];
  public editing = false;
  public localItems: RecipeItem[] = [new RecipeItem()];

  constructor() { }

  ngOnInit(): void {
    this.editing = !!this.options;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.items) { this.localItems = _.cloneDeep(changes.items.currentValue); }
  }

  addItem() {
    const item = new RecipeItem();
    this.localItems? this.localItems.push(item) : this.localItems = [item];
  }

  removeItem(index: number) {
    this.localItems?.splice(index, 1);
    this.delete.emit(index);
  }

  updateOption(index: number, ritem: RecipeItem) {
    ritem.measure = +ritem.measure; // type is initially lost
    this.update.emit({index, ritem});
  }

}
