import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lg: FormGroup;
  alert: any = {};
  start: boolean = false;
  year: number = new Date().getFullYear();

  constructor(private router: Router) {
    // Inicializamos el formulario con validaciones
    this.lg = new FormGroup({
      ci: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  login() {
    // Verificamos si el formulario es válido
    if (this.lg.valid) {
      this.start = true;

      // Simulamos la redirección al componente de inicio
      setTimeout(() => {
        this.router.navigateByUrl('/inicio');
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Iniciando sesión',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.start = false;
      }, 1000); // Simulamos un pequeño retraso antes de redirigir
    } else {
      // Mostramos un mensaje si el formulario no es válido
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  messageError(campo: string): string {
    const errors = this.lg.get(campo)?.errors;
    if (errors?.['required']) {
      return `${campo} es obligatorio.`;
    }
    return '';
  }

  inputValid(campo: string): boolean {
    return !!(this.lg.get(campo)?.invalid && this.lg.get(campo)?.touched);
  }

}
