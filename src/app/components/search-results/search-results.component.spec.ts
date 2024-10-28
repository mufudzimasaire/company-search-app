import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

// Mock CompanyService
class MockCompanyService {
  searchCompanies(query: string) {
    // Return a mock response
    return of({
      items: [{ company_number: '12345678', name: 'Test Company' }]
    });
  }
}

// Mock Router
class MockRouter {
  navigate() {}
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ q: 'test' })
          }
        },
        {
          provide: CompanyService,
          useClass: MockCompanyService
        },
        {
          provide: Router,
          useClass: MockRouter
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should fetch companies based on query', () => {
    // Assert
    expect(component.companies.length).toBeGreaterThan(0);
    expect(component.companies[0].company_number).toEqual('12345678');
  });

  it('should navigate to the search page if no query is provided', () => {
    // Arrange
    const mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');

    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.queryParams = of({});

    // Act
    component.ngOnInit();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});