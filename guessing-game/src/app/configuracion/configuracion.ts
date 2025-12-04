import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Configuracion } from '../configuracion.model';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css'
})
export class ConfiguracionComponent {

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

  bloqueado: boolean = false;

  configuracion?: Configuracion;

  @Output() configuracionLista = new EventEmitter<Configuracion>();

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
    if (!this.isFormValid) return;

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

    this.bloqueado = true;

    this.configuracionLista.emit(this.configuracion);
  }
}