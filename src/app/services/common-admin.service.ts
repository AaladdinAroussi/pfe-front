import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonAdminService {
  private apiUrl = `${environment.url}/api/commonAdmin`; 

  constructor(private http: HttpClient) { }

  // Méthode pour créer une entreprise
  createCompany(adminId: number, company: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveCompany/${adminId}`, company).pipe(
      catchError(error => {
        console.error('Create company error', error);
        return throwError(error);
      })
    );
  }
  // Récupérer toutes les entreprises par adminId
  getAllCompaniesByAdminId(adminId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllCompaniesByAdminId/${adminId}`).pipe(
      catchError(error => {
        console.error('Get all companies by admin ID error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour mettre à jour une entreprise
  updateCompany(company: any, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateCompany?id=${id}`, company).pipe(
      catchError(error => {
        console.error('Update company error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour supprimer une entreprise
  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCompany/${id}`).pipe(
      catchError(error => {
        console.error('Delete company error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour créer une offre d'emploi
  createJobOffer(jobOffer: any, adminId: number, companyId: number, categoryOfferId: number, cityId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create?adminId=${adminId}&companyId=${companyId}&categoryOfferId=${categoryOfferId}&cityId=${cityId}`, jobOffer).pipe(
      catchError(error => {
        console.error('Create job offer error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour mettre à jour une offre d'emploi
  updateJobOffer(jobOffer: any, id: number, adminId?: number, companyId?: number, categoryOfferId?: number, cityId?: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update?id=${id}&adminId=${adminId}&companyId=${companyId}&categoryOfferId=${categoryOfferId}&cityId=${cityId}`, jobOffer).pipe(
      catchError(error => {
        console.error('Update job offer error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour supprimer une offre d'emploi
  deleteJobOffer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete?id=${id}`).pipe(
      catchError(error => {
        console.error('Delete job offer error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour récupérer tous les candidats par ID d'offre
  getAllCandidatsByOfferId(offerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllCandidatbyofferId?offerId=${offerId}`).pipe(
      catchError(error => {
        console.error('Get all candidats by offer ID error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour récupérer un candidat par ID
  getCandidatById(candidatId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getCandidatbyId?candidatId=${candidatId}`).pipe(
      catchError(error => {
        console.error('Get candidat by ID error', error);
        return throwError(error);
      })
    );
  }
}