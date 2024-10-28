import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import { CompanySearchResult } from '../models/company-search-result.model';
import { OfficerList } from '../models/company-officers.model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Checking there are no outstanding requests
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#searchCompanies', () => {
    it('should return expected search results', () => {
      // Arrange
      const dummyQuery = 'Test Company';
      const dummyResponse: CompanySearchResult = {
        page_number: 1,
        kind: "search#companies",
        total_results: 20,
        items: [
          {
            company_status: "active",
            address_snippet: "Boswell Cottage Main Street, North Leverton, Retford, England, DN22 0AD",
            date_of_creation: "2008-02-11",
            matches: {
              title: [1,3]
            },
            description: "06500244 - Incorporated on 11 February 2008",
            links: {
              self: "/company/06500244"
            },
            company_number: "06500244",
            title: "BBC LIMITED",
            company_type: "ltd",
            address: {
              premises: "Boswell Cottage Main Street",
              postal_code: "DN22 0AD",
              country: "England",
              locality: "Retford",
              address_line_1: "North Leverton"
            },
            kind: "searchresults#company",
            description_identifier: [
              "incorporated-on"
            ]
          }
        ]
      }
      
      // Act & Assert
      service.searchCompanies(dummyQuery).subscribe((result) => {
        expect(result).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`/api/Search?Query=${dummyQuery}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('#getCompanyOfficers', () => {
    it('should return expected company officers', () => {
      // Arrange
      const dummyCompanyNumber = '12345678';
      const dummyOfficerResponse: OfficerList = {
        etag: "6dd2261e61776d79c2c50685145fac364e75e24e",
        links: {
          self: "/company/10241297/officers"
        },
        kind: "officer-list",
        items_per_page: 35,
        items: [
          {
            address: {
              premises: "The Leeming Building",
              postal_code: "LS2 7JF",
              country: "England",
              locality: "Leeds",
              address_line_1: "Vicar Lane"
            },
            name: "ANTLES, Kerri",
            appointed_on: "2017-04-01",
            officer_role: "director",
            links: {
              officer: {
                appointments: "/officers/4R8_9bZ44w0_cRlrxoC-wRwaMiE/appointments"
              }
            },
            date_of_birth: {
              month: 6,
              year: 1969
            },
            occupation: "Finance And Accounting",
            country_of_residence: "United States",
            nationality: "American"
          }
        ]
      };

      // Act & Assert
      service.getCompanyOfficers(dummyCompanyNumber).subscribe((officers) => {
        expect(officers).toEqual(dummyOfficerResponse);
      });

      const req = httpMock.expectOne(`/api/Officers?CompanyNumber=${dummyCompanyNumber}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyOfficerResponse);
    });
  });
});
