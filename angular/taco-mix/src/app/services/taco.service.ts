import { Injectable } from '@angular/core';
import { Taco } from '../interfaces/taco';
import { HttpService } from './http.service';

import { Store } from '@ngrx/store';
import { AppState } from '../store/index';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class TacoService {

  constructor(
    private http: HttpService,
    private store: Store<AppState>,
    private toast: ToastService
  ) {
  }

  getTacos() {
    this.http.get().subscribe((data: Taco[]) => {
      this.store.dispatch({
        type: 'LOAD_TACOS',
        payload: data
      });
    });
  }

  updateTaco(index: number, taco: Taco) {
    const data = {index, taco};
    this.http.post(data).subscribe((data: Taco[]) => {
      this.store.dispatch({
        type: 'UPDATE_TACO',
        payload: data
      });
    });
  }

  deleteTaco(index: number) {
    this.http.delete(index).subscribe((data: Taco[]) => {
      this.store.dispatch({
        type: 'DELETE_TACO',
        payload: data
      });
    });
  }
}
