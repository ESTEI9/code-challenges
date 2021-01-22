import { inject, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Taco } from '../interfaces/taco';
import * as _ from 'lodash';

describe('HttpService', () => {
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let initTacos: Taco[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
    initTacos = [
      {
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
      },
      {
        name: 'Best Taco',
        recipe: {
          shell: 'Whole Wheat',
          proteins: [{ name: 'Chicken', measure: 3, unit: 'Tbsp' }],
          toppings: [
            { name: 'Sour Cream', measure: 1, unit: 'Dollop' },
            { name: 'Mozarella', measure: 1, unit: 'Cups' },
          ],
          sauces: [{ name: 'Spicy Red Sauce', measure: 1, unit: 'Dollop' }],
        },
      },
    ];
  });

  beforeEach(inject(
    [HttpService],
    (service: HttpService) => {
      httpService = service;
    }
  ));

  it('should return data', () => {
    httpService.get().subscribe((tacos: Taco[]) => {
      expect(tacos).toEqual(initTacos);
    });
    const req = httpTestingController.expectOne(`${httpService.server}/tacos`);
    req.flush(initTacos);
    expect(req.request.method).toEqual('GET');
  });

  it('should update an item', () => {
    let mockTacos = _.cloneDeep(initTacos);
    const index = 0;
    const mockTaco = mockTacos[0];
    mockTacos[0].name = 'Mocking Taco';
    httpService.post({index, mockTaco}).subscribe((tacos: Taco[]) => {
      expect(tacos[0].name).toBe('Mocking Taco');
    });
    const req = httpTestingController.expectOne(`${httpService.server}/update`);
    req.flush(mockTacos);
    expect(req.request.method).toEqual('POST');
  });

  it('should delete an item', () => {
    httpService.delete(0).subscribe((tacos: Taco[]) => {
      expect(tacos[0].name).toEqual(initTacos[1].name);
    });
    const req = httpTestingController.expectOne(`${httpService.server}/delete/0`);
    req.flush([initTacos[1]]);
    expect(req.request.method).toEqual('DELETE');
  });
});
