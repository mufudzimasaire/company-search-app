import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

export const routes: Routes = [
  { 
    path: '',
    component: SearchComponent,
    title: 'Search'
  },
  {
    path: 'results',
    component: SearchResultsComponent,
    title: 'Results'
  },
];
