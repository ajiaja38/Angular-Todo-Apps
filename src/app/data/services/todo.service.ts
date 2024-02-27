import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../global/base-url';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly http: HttpClient) {}

  getAllTodo(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/todo/all-by-author`);
  }
}
