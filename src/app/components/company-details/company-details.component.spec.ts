import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompanyDetailsComponent } from './company-details.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Mock Router class
class MockRouter {
  navigate() {}
}

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;

  // Mock history.state with full company structure
  const mockHistoryState = {
    company: {
      title: 'Test Company',
      company_number: '12345678',
      address_snippet: '123 Test St, Test City, TC1 1TT',
      company_status: 'Active',
      company_type: 'Limited',
      date_of_creation: new Date('2020-01-01')
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, RouterLink],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => {
                return 'test'; 
              }
            })
          }
        },
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: 'Window',
          useValue: {
            history: {
              state: mockHistoryState
            }
          }
        }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;

    // Call ngOnInit() to retrieve company
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});