import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface Configuracion {
  nombre: string;
  apellido: string;
  rangoMaximo: number;
  numeroDeIntentos: number;
  numeroAleatorio: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guessing-game');

  nombre: string = '';
  apellido: string = '';
  rangoMaximo: number | null = null;
  numeroDeIntentos: number | null = null;

  feedbackNombre: string = '';
  feedbackApellido: string = '';
  feedbackRango: string = '';
  feedbackIntentos: string = '';

  nombreValido: boolean = false;
  apellidoValido: boolean = false;
  rangoValido: boolean = false;
  intentosValidos: boolean = false;

  configuracion?: Configuracion;

  juegoIniciado: boolean = false;
  juegoTerminado: boolean = false;
  numeroJugador: number | null = null;
  mensajeResultado: string = '';
  intentosRestantes: number = 0;

  validarNombre(): void {
    if (!this.nombre || this.nombre.trim() === '') {
      this.nombreValido = false;
      this.feedbackNombre = 'El nombre no puede estar vacío.';
    } else {
      this.nombreValido = true;
      this.feedbackNombre = 'OK';
    }
  }

  validarApellido(): void {
    if (!this.apellido || this.apellido.trim() === '') {
      this.apellidoValido = false;
      this.feedbackApellido = 'El apellido no puede estar vacío.';
    } else {
      this.apellidoValido = true;
      this.feedbackApellido = 'OK';
    }
  }

  validarRango(): void {
    if (this.rangoMaximo === null || this.rangoMaximo === undefined) {
      this.rangoValido = false;
      this.feedbackRango = 'Debes introducir un número.';
    } else if (this.rangoMaximo < 4) {
      this.rangoValido = false;
      this.feedbackRango = 'El rango mínimo es 4.';
    } else {
      this.rangoValido = true;
      this.feedbackRango = 'OK';
    }
  }

  validarIntentos(): void {
    if (this.numeroDeIntentos === null || this.numeroDeIntentos === undefined) {
      this.intentosValidos = false;
      this.feedbackIntentos = 'Debes introducir un número.';
    } else if (this.numeroDeIntentos < 1) {
      this.intentosValidos = false;
      this.feedbackIntentos = 'Hace falta al menos 1 intento.';
    } else {
      this.intentosValidos = true;
      this.feedbackIntentos = 'OK';
    }
  }

  get isFormValid(): boolean {
    return (
      this.nombreValido &&
      this.apellidoValido &&
      this.rangoValido &&
      this.intentosValidos
    );
  }

  recogerDatos(): void {
    if (!this.isFormValid) {
      return;
    }

    const rango = this.rangoMaximo!;
    const intentos = this.numeroDeIntentos!;

    const numeroAleatorio = Math.floor(Math.random() * rango);

    this.configuracion = {
      nombre: this.nombre,
      apellido: this.apellido,
      rangoMaximo: rango,
      numeroDeIntentos: intentos,
      numeroAleatorio: numeroAleatorio
    };

    console.log('Configuración creada:', this.configuracion);

    this.juegoIniciado = true;
    this.juegoTerminado = false;
    this.intentosRestantes = intentos;
    this.numeroJugador = null;
    this.mensajeResultado = '';
  }

  intentar(): void {
    if (!this.juegoIniciado || this.juegoTerminado || !this.configuracion) {
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
      this.mensajeResultado = 'Has Ganado! Winner winner, chicken dinner!';
      this.juegoTerminado = true;
      return;
    }

    if (intento > objetivo) {
      this.mensajeResultado = 'Te pasaste!';
    } else {
      const diff = objetivo - intento;

      if (diff === 1) {
        this.mensajeResultado = 'Caliente';
      } else if (diff === 2) {
        this.mensajeResultado = 'Templado';
      } else {
        this.mensajeResultado = 'Frío';
      }
    }

    if (this.intentosRestantes <= 0) {
      this.juegoTerminado = true;
      this.mensajeResultado += ' | No te quedan más intentos. Has Perdido!';
    }
  }
}