import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanySearchResult } from '../models/company-search-result.model';
import { OfficerList } from '../models/company-officers.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly headers = new HttpHeaders({
    'x-api-key': import.meta.env['NG_APP_API_KEY']
  });

  constructor(private readonly http: HttpClient) {}

  /**
   * Search for companies by name or company number
   * @param query The search query
   * @returns An observable of the search results
   */
  searchCompanies(query: string): Observable<CompanySearchResult> {
    return this.http.get<CompanySearchResult>(`/api/Search?Query=${query}`, { headers: this.headers });
  }

  /**
   * Get the officers of a company by company number
   * @param companyNumber The company number
   * @returns An observable of the company officers
   */
  getCompanyOfficers(companyNumber: string): Observable<OfficerList> {
    return this.http.get<OfficerList>(`/api/Officers?CompanyNumber=${companyNumber}`, { headers: this.headers });
  }
}
  