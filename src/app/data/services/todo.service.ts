import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../global/base-url';
import { PayloadTodoDto, StatusTodoDto } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly http: HttpClient) {}

  createTodo(payloadTodoDto: PayloadTodoDto): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/todo`, payloadTodoDto);
  }

  getAllActiveTodo(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/todo/all-by-author/active`);
  }

  getAllArchiveTodo(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/todo/all-by-author/archive`);
  }

  updateStatusTodo(id: string, statusTodoDto: StatusTodoDto): Observable<any> {
    return this.http.put<any>(
      `${BASE_URL}/todo/update/todo-status/${id}`,
      statusTodoDto
    );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/todo/${id}`);
  }

  uploader(formData: FormData): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/uploader`, formData);
  }
}
