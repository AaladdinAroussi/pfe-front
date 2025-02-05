import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.url}/api/admin`; 

  constructor(private http: HttpClient) { }

  // Méthode pour marquer une offre comme "pourvue"
  markJobAsFilled(jobId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}markFilled?id=${jobId}`, {}).pipe(
      catchError(error => {
        console.error('Mark job as filled error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour fermer une offre d'emploi
  closeJobOffer(jobId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}close?id=${jobId}`, {}).pipe(
      catchError(error => {
        console.error('Close job offer error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour récupérer les offres actives par ID d'admin
  getActiveJobOffersByAdmin(adminId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}activeJobs?adminId=${adminId}`).pipe(
      catchError(error => {
        console.error('Get active job offers error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour récupérer les offres ouvertes par ID d'admin
  getOpenJobOffersByAdmin(adminId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}openJobs?adminId=${adminId}`).pipe(
      catchError(error => {
        console.error('Get open job offers error', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour récupérer les offres en attente par ID d'admin
  getPendingJobOffersByAdmin(adminId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}pendingJobs?adminId=${adminId}`).pipe(
      catchError(error => {
        console.error('Get pending job offers error', error);
        return throwError(error);
      })
    );
  }
}