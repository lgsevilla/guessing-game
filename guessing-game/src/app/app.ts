import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Configuracion } from './configuracion.model';
import { ConfiguracionComponent } from './configuracion/configuracion';
import { JuegoComponent } from './juego/juego';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, ConfiguracionComponent, JuegoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guessing-game');

  configuracion?: Configuracion;

  onConfiguracionLista(cfg: Configuracion): void {
    this.configuracion = cfg;
  }
}