import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private baseUrl = 'http://localhost:8080/api/superAdmin'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Level Endpoints
  createLevel(level: any, superadminId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}saveLevel?superadminId=${superadminId}`, level);
  }

  updateLevel(level: any, id: number, superadminId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}updateLevel?id=${id}&superadminId=${superadminId}`, level);
  }

  deleteLevel(id: number, superadminId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteLevel?id=${id}&superadminId=${superadminId}`);
  }

  // Category Offer Endpoints
  createCategoryOffer(categoryOffer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}saveCategoryOffer`, categoryOffer);
  }



  updateCategoryOffer(categoryOffer: any, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}updateCategoryOffer?id=${id}`, categoryOffer);
  }

  deleteCategoryOffer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteCategoryOffer?id=${id}`);
  }

  // City Endpoints
  createCity(city: any): Observable<any> {
    return this.http.post(`${this.baseUrl}saveCity`, city);
  }

  updateCity(city: any, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}updateCity?id=${id}`, city);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteCity?id=${id}`);
  }

  // Sector Endpoints
  createSector(sector: any): Observable<any> {
    return this.http.post(`${this.baseUrl}saveSector`, sector);
  }

  updateSector(sector: any, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}updateSector?id=${id}`, sector);
  }

  deleteSector(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteSector?id=${id}`);
  }

  // Job Offer Endpoints
  markJobAsOpen(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}markOpen?id=${id}`, {});
  }

  getActiveJobOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}activeJob`);
  }

 getPendingJobOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}pendingjobs`);
  }

  // Company Endpoints
  getAllCompanies(): Observable<any> {
    return this.http.get(`${this.baseUrl}allCompanies`);
  }
}