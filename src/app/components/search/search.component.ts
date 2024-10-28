import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() query = signal('');

  /**
   * @constructor
   * @param router The router service
   * @returns void
   */
  constructor(private readonly router: Router) {}

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