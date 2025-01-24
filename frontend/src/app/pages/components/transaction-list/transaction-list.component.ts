import { Component, OnInit } from '@angular/core';
import { ListTransactionService } from '../../shared/services/list-transaction.service';
import { Root ,Transaction } from '../../../interfaces/transaction-list.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  originalListFormat!: Transaction[];
  ListFormat!: Transaction[]; 
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1; 
  constructor(private listTransactionService: ListTransactionService, private messageService: MessageService) {}

  ngOnInit() {
    this.getTransaction(this.currentPage, this.pageSize);
  }

  getTransaction(page: number, pageSize: number): void {
    this.listTransactionService.getTransactions(page, pageSize).subscribe({
      next: (response: Root) => {
        this.ListFormat = response.transactions;
        this.originalListFormat = [...response.transactions]; // Guarda la lista original
      },
      error: (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las ubicaciones'});
        console.error('Error al obtener ubicaciones', error);
      }
    });
  }

}
