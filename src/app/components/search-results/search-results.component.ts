import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company-search-result.model';
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

  constructor(private readonly router: Router, private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit() {
    // Get the query from the URL
    this.route.queryParams.subscribe(params => {
      const query = params['q'];

      // If there is no query, redirect to the search page
      if (!query) {
        this.router.navigate(['/']);
      }

      // Search for companies
      this.companyService.searchCompanies(query).subscribe(response => {
        this.companies = response.items;
      });
    });
  }
}