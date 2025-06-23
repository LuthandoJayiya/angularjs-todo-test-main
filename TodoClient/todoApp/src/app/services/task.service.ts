import { Injectable } from '@angular/core';
import axios from 'axios';
import { Task } from '../dashboard/pages/tasks/task.model';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:5139/Todos';

  constructor() {}

  getTasks(): Observable<Task[]> {
    const token = sessionStorage.getItem('token');
    return from(axios.get<Task[]>(this.baseUrl, { headers: { Authorization: `Bearer ${token}` } }).then(response => response.data));
  }

  getTask(id: string): Observable<Task> {
    const token = sessionStorage.getItem('token');
    return from(axios.get<Task>(`${this.baseUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(response => response.data));
  }

  createTask(task: Task): Observable<Task> {
    const token = sessionStorage.getItem('token');
    return from(axios.post<Task>(this.baseUrl, task, { headers: { Authorization: `Bearer ${token}` } }).then(response => response.data));
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const token = sessionStorage.getItem('token');
    return from(axios.put<Task>(`${this.baseUrl}/${id}`, task, { headers: { Authorization: `Bearer ${token}` } }).then(response => response.data));
  }

  deleteTask(id: string): Observable<void> {
    const token = sessionStorage.getItem('token');
    return from(axios.delete<void>(`${this.baseUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(response => response.data));
  }
}
