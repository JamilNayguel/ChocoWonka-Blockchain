import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListProductHomeService {

  private path: string = environment.base_url; 
  private path_img: string = environment.base_repo_img_add; 
  private token: string = localStorage.getItem('token') || ''; 

  constructor(private http: HttpClient) {}

  
  private getHttpOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  // Método para obtener las ubicaciones con paginación y filtro 
  getProducts(page: number, pageSize: number, search: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${this.path}products/`, { params, ...this.getHttpOptions() });
  }

  getImageUrlGender(imageName: string): string {
    return `${this.path_img}uploads/${imageName}`;
  }




  setLocationInactive(id: number): Observable<any> {
    return this.http.patch<any>(`${this.path}products/inactive/${id}`, {}, this.getHttpOptions()).pipe(
      tap(() => console.log(`Material ${id} desactivado`)),
      catchError((error) => {
        console.error('Error al desactivar el material:', error);
        return throwError(() => new Error('Error al desactivar el producto'));
      })
    );
  }

}
