import { inject, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Taco } from '../interfaces/taco';
import { AppState } from '../store';
import { TacoService } from './taco.service';
import { HttpService } from './http.service';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

describe('TacoService', () => {
  let service: TacoService;
  let store: MockStore<AppState>;
  let httpClient: HttpClient;
  let initTacos: Taco[];
  let tacos: Taco[] = [{
    name: 'Plain Hard Taco',
    recipe: {
      shell: 'Hard Corn',
      proteins: [
        { name: 'Beef', measure: 3, unit: 'Tbsp' }
      ],
      toppings: [
        { name: 'Mozarella', measure: 3, unit: 'Tbsp' },
        { name: 'Cilantro', measure: 2, unit: 'Dollop' }
      ],
      sauces: [
        { name: 'Verde', measure: 2, unit: 'Tbsp' }
      ]
    }
  },{
    name: 'Best Soft Taco',
    recipe: {
      shell: 'Whole Wheat',
      proteins: [
        { name: 'Chicken', measure: 1, unit: 'Cups' }
      ],
      toppings: [
        { name: 'Cilantro', measure: 1, unit: 'Tbsp' }
      ],
      sauces: [
        { name: 'Red Sauce', measure: 1, unit: 'Dollop' }
      ]
    }
  }];
  let initialState = {tacos};

  beforeEach(() => {
    let store:MockStore<AppState>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({initialState}),
        HttpService,
        ToastService
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    initTacos = _.cloneDeep(tacos);
    store = TestBed.inject(MockStore);
    service = TestBed.inject(TacoService);
  });

  beforeEach(inject(
    [MockStore],
    (mockStore: MockStore<AppState>) => {
      mockStore.setState(initialState);
      store = mockStore;
    }
  ));

  it('#getTaco should retrieve a list of tacos', () => {
    service.getTacos();
    store.subscribe(state => {
      expect(state.tacos).toEqual(tacos);
    });
  });

  it('#updateTaco should update a taco', () => {
    tacos[0].name = 'Test Taco';
    service.updateTaco(0, tacos[0]);
    store.subscribe(state => {
      expect(state.tacos[0]).toEqual(tacos[0]);
    });
  });

  it('#deleteTaco should delete a taco', () => {
    initTacos = initTacos.splice(1, 1);
    service.deleteTaco(1);
    store.subscribe(state => {
      expect(state.tacos[1]).toEqual(initTacos[0]);
    });
  });
});
