import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanySearchResult } from '../models/company-search-result.model';
import { OfficerList } from '../models/company-officers.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly apiUrl = import.meta.env.NGX_BASE_URL;
  private readonly headers = new HttpHeaders({
    'x-api-key': import.meta.env.NGX_API_KEY
  });

  constructor(private readonly http: HttpClient) {}

  /**
   * Search for companies by name or company number
   * @param query The search query
   * @returns An observable of the search results
   */
  searchCompanies(query: string): Observable<CompanySearchResult> {
    return this.http.get<CompanySearchResult>(`${this.apiUrl}/Search?Query=${query}`, { headers: this.headers });
  }

  /**
   * Get the officers of a company by company number
   * @param companyNumber The company number
   * @returns An observable of the company officers
   */
  getCompanyOfficers(companyNumber: string): Observable<OfficerList> {
    return this.http.get<OfficerList>(`${this.apiUrl}/Officers?CompanyNumber=${companyNumber}`, { headers: this.headers });
  }
}
  