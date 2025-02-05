import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = `${environment.url}/api/Common/`;
  constructor(private http: HttpClient) { }

  // Company Endpoints
  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getCompanyById/${id}`);
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(`${this.baseUrl}getAllCompanies`);
  }

  // City Endpoints
  getAllCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}allCities`);
  }

  getCityById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getByIdCity/${id}`);
  }

  // Level Endpoints
  getAllLevels(): Observable<any> {
    return this.http.get(`${this.baseUrl}allLevel`);
  }

  getLevelById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getByIdLevel/${id}`);
  }

  // Sector Endpoints
  getAllSectors(): Observable<any> {
    return this.http.get(`${this.baseUrl}allSectors`);
  }

  getSectorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getByIdSector/${id}`);
  }

  // Job Offer Endpoints
  getAllJobOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}getAllExceptPending`);
  }

  getJobOfferById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getbyid/${id}`);
  }

  searchJobOffers(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search`, { params: { keyword } });
  }

  filterJobOffersByJobType(jobType: string): Observable<any> {
    return this.http.get(`${this.baseUrl}filter/jobType`, { params: { jobType } });
  }

  getAllCategoryOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}allCategoryOffers`);
  }

  getCategoryOfferById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getByIdCategoryOffer/${id}`);
  }

  filterByCategory(categoryOffer: any): Observable<any> {
    return this.http.get(`${this.baseUrl}filter-by-category`, { params: { categoryOffer } });
  }

  filterByLocation(location: string): Observable<any> {
    return this.http.get(`${this.baseUrl}filter-by-location`, { params: { location } });
  }

  filterBySalary(salary: number): Observable<any> {
    return this.http.get(`${this.baseUrl}filter-by-salary`, { params: { salary } });
  }

  filterByExperience(experience: string): Observable<any> {
    return this.http.get(`${this.baseUrl}filter-by-experience`, { params: { experience } });
  }

  filterByDate(timeFrame: string): Observable<any> {
    return this.http.get(`${this.baseUrl}filter-by-date`, { params: { timeFrame } });
  }
}