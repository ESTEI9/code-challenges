import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taco } from '../interfaces/taco';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public server = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Taco[]> {
    return this.http.get<Taco[]>(`${this.server}/tacos`);
  }

  post(data: any): Observable<Taco[]> {
    return this.http.post<Taco[]>(`${this.server}/update`, JSON.stringify(data));
  }

  delete(index: number) {
    return this.http.delete<Taco[]>(`${this.server}/delete/${index}`);
  }

}
