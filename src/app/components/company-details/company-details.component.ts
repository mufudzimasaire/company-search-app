import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Company } from '../../models/company-search-result.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent implements OnInit {
  company: Company | null = null;

  /**
   * @constructor
   * @param platformId The platform ID
   * @param location The location service
   * @param router The router service
   * @returns void
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit() {
    // Check if running in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.company = window.history.state.company;

      // Redirect back if there's no company data
      if (!this.company) {
        this.location.back();
        return;
      }
    }

    // SSR: Redirect home if there's no company data
    if (!this.company) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Navigate to the officers page
   * @returns void
   */
  goToOfficers() {
    // Navigate to the officers page
    this.router.navigate([`/company/${this.company?.company_number}/officers`], {
      state: { company: this.company }
    });
  }
}