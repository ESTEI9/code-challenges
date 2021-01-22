import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RecipeItem } from 'src/app/interfaces/recipe-item';

import { EditTacoComponent } from './edit-taco.component';

describe('EditTacoComponent', () => {
  let component: EditTacoComponent;
  let fixture: ComponentFixture<EditTacoComponent>;
  let taco = {
      name: 'Plain Taco',
      recipe: {
        shell: 'Hard Corn',
        proteins: [{ name: 'Beef', measure: 3, unit: 'Tbsp' }],
        toppings: [
          { name: 'Mozarella', measure: 3, unit: 'Tbsp' },
          { name: 'Cilantro', measure: 2, unit: 'Dollop' },
        ],
        sauces: [{ name: 'Verde', measure: 2, unit: 'Tbsp' }],
      },
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTacoComponent],
      imports: [MatDialogModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MatSidenav]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTacoComponent);
    component = fixture.componentInstance;
    component.taco = taco;
    component.localTaco = component.taco;
    component.editing = {state: false};
    fixture.detectChanges();
  });

  it('#updateItems should update appropriate recipe items', () => {
    let index = 0;
    let ritem: RecipeItem = {name: 'Chicken', measure: 2, unit: 'Tbsp'};
    component.updateItems('proteins', {index, ritem});
    expect(component.localTaco.recipe.proteins[index]).toEqual(ritem);
  });

  it('#deleteItem should delete recipe item at index', () => {
    let index = 0;
    component.deleteItem('toppings', index);
    expect(component.localTaco.recipe.toppings).toEqual([{ name: 'Cilantro', measure: 2, unit: 'Dollop' }]);
  });
});
