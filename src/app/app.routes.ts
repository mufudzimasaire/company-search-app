import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { OfficersListComponent } from './components/officers-list/officers-list.component';

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
  {
    path: 'company/:companyNumber',
    component: CompanyDetailsComponent,
    title: 'Company Details'
  },
  { 
    path: 'company/:companyNumber/officers',
    component: OfficersListComponent,
    title: 'Company Officers'
  }
];
