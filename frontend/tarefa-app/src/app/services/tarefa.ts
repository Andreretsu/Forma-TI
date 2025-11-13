import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5159/api/Tarefas';

  constructor() {}

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  addTarefa(novaTarefa: { titulo: string }): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, novaTarefa);
  }

  updateTarefa(tarefa: Tarefa): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${tarefa.id}`, tarefa);
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
