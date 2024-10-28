import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { CompanyDetailsComponent } from '../company-details/company-details.component';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockLocation {
  back = jasmine.createSpy('back');
}

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailsComponent, HttpClientModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: Location, useClass: MockLocation }
      ]
    })
    .compileComponents();

    // Mock window.history.state
    Object.defineProperty(window, 'history', {
      value: {
        state: {
          company: { title: 'Mock Company', company_number: '12345678' }
        }
      },
      writable: true
    });

    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to back if company is null', () => {
    // Arrange
    Object.defineProperty(window, 'history', {
      value: { state: { company: null } },
      writable: true
    });

    // Act
    component.ngOnInit();

    // Assert
    expect(component.company).toBeNull();
    expect(TestBed.inject(Location).back).toHaveBeenCalled();
  });

  it('should navigate to officers page', () => {
    // Arrange
    component.company = { title: 'Mock Company', company_number: '12345678' } as any;

    // Act
    component.goToOfficers();

    // Assert
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['/company/12345678/officers'], { state: { company: component.company } });
  });
});