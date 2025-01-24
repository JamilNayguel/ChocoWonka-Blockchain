import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Root, Item } from '../../../interfaces/new-transaction.interface';
import { NewTransactionService } from '../../shared/services/new-transaction.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  value!: string;
  
  transactionData: Root | null = null;

  lg: FormGroup;

  constructor(private router: Router, 
              private messageService: MessageService,
              private fb: FormBuilder,
              private transactionService: NewTransactionService) {
    // Recuperar datos pasados por state
    const navigation = this.router.getCurrentNavigation();
    this.transactionData = navigation?.extras?.state?.['data'] || null;



    this.lg = this.fb.group({
      Usuario: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Contrasena: new FormControl('', [Validators.required]),
      Pais: new FormControl('', [Validators.required]),
      Ciudad: new FormControl('', [Validators.required]),
      Direccion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    if (!this.transactionData) {
      console.error('No hay datos de transacción');
      this.router.navigate(['/dashboard']); // Redirigir si no hay datos
    }


  }

  
  sendTransaction() {
    if (this.lg.invalid) {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos obligatorios antes de proceder.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#ea547c',
      });
      return;
    }
  
    if (!this.transactionData) {
      console.error('No hay datos de transacción');
      return;
    }
  
    // Mostrar confirmación antes de proceder
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres proceder con la transacción?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, proceder',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#4fb9a8',
      cancelButtonColor: '#ea547c',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para enviar la transacción
        this.transactionService.postNewTransaction(this.transactionData!).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Transacción exitosa',
              text: 'La transacción se completó correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#4fb9a8',
            }).then(() => {
              this.router.navigate(['inicio']);
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al procesar la transacción. Por favor, inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#ea547c',
            });
          },
        });
      }
    });
  }
  


  inputValid(input: string) {
    return this.lg.controls[input].invalid && this.lg.controls[input].touched;
  }

  messageError(input: string) {
    const control = this.lg.get(input);
    if (control?.hasError('required')) {
      return 'Campo obligatorio';
    } else if (control?.hasError('pattern')) {
      return 'Formato incorrecto';
    } else if (control?.hasError('maxlength')) {
      return 'Longitud máxima excedida';
    }
    return '';
  }

  showMessage(severity: string, summary: string, detail: string, icon: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
      closable: true,
      life: 6000,
      icon,
    });
  }
  

}
