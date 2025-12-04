import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Configuracion } from '../configuracion.model';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './juego.html',
  styleUrl: './juego.css'
})
export class JuegoComponent {

  @Input() configuracion!: Configuracion;

  juegoTerminado: boolean = false;
  numeroJugador: number | null = null;
  mensajeResultado: string = '';
  intentosRestantes: number = 0;

  ngOnInit(): void {
    this.intentosRestantes = this.configuracion.numeroDeIntentos;
  }

  intentar(): void {
    if (this.juegoTerminado || !this.configuracion) {
      return;
    }

    if (this.numeroJugador === null || this.numeroJugador === undefined) {
      this.mensajeResultado = 'Introduce un número antes de enviar.';
      return;
    }

    const objetivo = this.configuracion.numeroAleatorio;
    const intento = this.numeroJugador;

    this.intentosRestantes--;

    if (intento === objetivo) {
      this.mensajeResultado = 'Has Ganado! Winner, Winner, Chicken Dinner!';
      this.juegoTerminado = true;
      return;
    }

    if (intento > objetivo) {
      this.mensajeResultado = 'Te pasaste!';
    } else {
      const diff = objetivo - intento;

      if (diff === 1) {
        this.mensajeResultado = 'Caliente!';
      } else if (diff === 2) {
        this.mensajeResultado = 'Templado!';
      } else {
        this.mensajeResultado = 'Frío!';
      }
    }

    if (this.intentosRestantes <= 0) {
      this.juegoTerminado = true;
      this.mensajeResultado += ' | No te quedan más intentos! El número era ' + objetivo + '.';
    }
  }
}