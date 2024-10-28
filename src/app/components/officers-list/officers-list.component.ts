import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Officer } from '../../models/company-officers.model';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { Company } from '../../models/company-search-result.model';

@Component({
  selector: 'app-officers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './officers-list.component.html',
  styleUrl: './officers-list.component.scss'
})
export class OfficersListComponent implements OnInit {
  company: Company | null = null;
  companyNumber: string | null = null;
  officers: Officer[] = [];
  loading = true;
  error: string | null = null;

  /**
   * @constructor
   * @param platformId The platform ID
   * @param companyService The company service
   * @param location The location service
   * @param router The router service
   * @returns void
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private companyService: CompanyService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if running in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.company = window.history.state.company;
      this.companyNumber = this.company?.company_number as string;
      
      // If there is no company number, redirect to the search page
      if (!this.companyNumber) {
        this.location.back();
        return;
      }
    }

    // SSR: Redirect home if there's no company data
    if (!this.companyNumber) {
      this.router.navigate(['/']);
    }

    // Get the officers of the company
    this.companyService.getCompanyOfficers(this.companyNumber as string).subscribe({
      next: (response) => {
        this.officers = response.items;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.error = 'Failed to load officers. Please try again later.';
        this.loading = false
      }
    });
  }
}