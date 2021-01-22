import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import * as _ from 'lodash'

import { RecipeItem } from 'src/app/interfaces/recipe-item';
import { RecipeItemsComponent } from './recipe-items.component';

describe('RecipeItemComponent', () => {
  let component: RecipeItemsComponent;
  let fixture: ComponentFixture<RecipeItemsComponent>;
  let items: RecipeItem[] = [
    { name: 'Mozarella', measure: 3, unit: 'Tbsp' },
    { name: 'Cilantro', measure: 2, unit: 'Dollop' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeItemsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemsComponent);
    component = fixture.componentInstance;
    component.localItems = items;
    fixture.detectChanges();
  });

  it('should add a new empty item to the array', () => {
    let newItem = new RecipeItem();
    component.addItem();
    expect(component.localItems[2]).toEqual(newItem);
  });

  it('should remove an item at the correct index', () => {
    component.removeItem(0);
    expect(component.localItems[0].name).toBe('Cilantro');
    component.localItems[1] = { name: 'Cilantro', measure: 2, unit: 'Dollop' }; // Fix for if this test runs before the previous one, which it sometimes does...
  });
});
