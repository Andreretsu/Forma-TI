import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TarefaService } from './services/tarefa';
import { Tarefa } from './models/tarefa.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {
  private tarefaService = inject(TarefaService);
  public tarefas: Tarefa[] = [];
  public novoTituloTarefa: string = '';

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.getTarefas().subscribe((tarefasDaApi) => {
      this.tarefas = tarefasDaApi;
    });
  }

  adicionarTarefa(): void {
    if (!this.novoTituloTarefa.trim()) {
      return;
    }

    const novaTarefa = { titulo: this.novoTituloTarefa };

    this.tarefaService.addTarefa(novaTarefa).subscribe((tarefaCriada) => {
      this.tarefas.push(tarefaCriada);
      this.novoTituloTarefa = '';
    });
  }

  toggleConcluida(tarefa: Tarefa): void {
    tarefa.concluida = !tarefa.concluida;
    this.tarefaService.updateTarefa(tarefa).subscribe(() => {});
  }

  excluirTarefa(id: number): void {
    this.tarefaService.deleteTarefa(id).subscribe(() => {
      this.tarefas = this.tarefas.filter((t) => t.id !== id);
    });
  }
}
