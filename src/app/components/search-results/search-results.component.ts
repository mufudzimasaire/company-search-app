import { Component, OnInit } from '@angular/core';
import { Company, CompanySearchResult } from '../../models/company-search-result.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {
  companies: Company[] = [];
  loading = false;
  error: string | null = null;

  /**
   * @constructor
   * @param route The activated route
   * @param companyService The company service
   * @param router The router service
   * @returns void
   */
  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the query from the URL
    this.route.queryParams.subscribe(params => {
      const query = params['q'];

      // If there is no query, redirect to the search page
      if (!query) {
        this.router.navigate(['/']);
      } else {
        this.fetchCompanies(query);
      }
    });
  }

  private fetchCompanies(query: string) {
    this.loading = true;
    this.error = null;

    // Search for companies
    this.companyService.searchCompanies(query).subscribe({
      next: (data: CompanySearchResult) => {
        this.companies = data.items;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error(error);
        this.error = 'Failed to load companies. Please try again later.';
        this.loading = false
      }
    });
  }

  /**
   * Navigate to the company details page
   * @param company The company to navigate to
   * @returns void
   */
  goToCompanyDetails(company: Company) {
    this.router.navigate(['/company', company.company_number], {
      state: { company }
    });
  }
}