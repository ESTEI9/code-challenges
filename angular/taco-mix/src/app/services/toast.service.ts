import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  createToast: Subject<Object> = new Subject<Object>();

  constructor() {}

  create(message: string, color: string) {
    this.createToast.next({ message, color });
  }
}
