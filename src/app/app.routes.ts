import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { OfficersListComponent } from './components/officers-list/officers-list.component';
import { authGuard } from './guards/auth.guard';

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
    title: 'Company Details',
    canActivate: [authGuard]
  },
  { 
    path: 'company/:companyNumber/officers',
    component: OfficersListComponent,
    title: 'Company Officers',
    canActivate: [authGuard]
  }
];
