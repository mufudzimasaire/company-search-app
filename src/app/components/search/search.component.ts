import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() query = signal('');
  errorMessage: string | null = null;

  /**
   * @constructor
   * @param router The router service
   * @returns void
   */
  constructor(private readonly router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get('error');

      if (error === 'unauthorized') {
        this.errorMessage = 'You are not authorized to view company details page.';
      }
    };
  }

  /**
   * Search for the query
   * @returns void
   */
  search() {
    if (this.query().trim()) {
      // Navigate to the results page with the query as a query parameter
      this.router.navigate(
        ['/results'],
        { queryParams: { q: this.query() } }
      );
    }
  }
}