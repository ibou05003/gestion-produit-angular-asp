import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  public resourceUrl = environment.API_URL+"Produits";
  public pdfUrl = environment.API_URL+"Pdf/Get";

  constructor(private http:HttpClient) { }

  /**créer produit */
  create(employee: any): Observable<any> {
    return this.http.post<any>(this.resourceUrl, employee);
  }

  /**modifier produit */
  update(employee: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.resourceUrl}/${id}`, employee);
  }

  /**rechercher produit */
  find(id: string): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`);
  }

  /**Supprimer produit */
  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }


  /**Liste des produit */
  getEmployees(): Observable<any>{
    return this.http.get<any>(this.resourceUrl)
    .pipe(catchError(this.errorHandler))
  }

  /**permet la gestion des erreurs */
  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }

    /**créer produit */
    loadPdf(): Observable<any> {
      return this.http.get<any>(this.pdfUrl);
    }
  
}
