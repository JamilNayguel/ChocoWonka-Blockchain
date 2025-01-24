import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Root  } from '../../../interfaces/new-transaction.interface'; // Importa la interfaz adecuada


@Injectable({
  providedIn: 'root'
})
export class NewTransactionService {

  private path: string = environment.base_url; 

  constructor(private http: HttpClient) {}

  private getHttpOptions(): { headers: HttpHeaders } { 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers };
  }


  postNewTransaction(transactionData: Root): Observable<any> {
    const url = `${this.path}orders`;
    return this.http.post<any>(url, transactionData, this.getHttpOptions());
  }

}
