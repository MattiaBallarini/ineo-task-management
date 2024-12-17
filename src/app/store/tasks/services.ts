import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ITask, TTaskStatus } from '@lib';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private http = inject(HttpClient);

  getTasks(range: { from?: string; to?: string }): Observable<ITask[]> {
    let params = new HttpParams();
    if (range?.from) params = params.set('from', range.from);
    if (range?.to) params = params.set('to', range.to);

    return this.http.get<ITask[]>(this.apiUrl, { params });
  }

  getTaskStatuses(): Observable<TTaskStatus[]> {
    return this.http.get<TTaskStatus[]>(`${this.apiUrl}/status`);
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task);
  }

  updateTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
