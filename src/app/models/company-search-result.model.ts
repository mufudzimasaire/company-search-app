import { Address } from "./address.model";

export interface CompanySearchResult {
  items: Company[];
  kind: string;
  page_number: number;
  total_results: number;
}

export interface Company {
  address: Address;
  address_snippet: string;
  company_number: string;
  company_status: string;
  company_type: string;
  date_of_creation: string;
  description: string;
  description_identifier: string[];
  kind: string;
  links: { 
    self: string;
  };
  matches: {
    title: number[];
  };
  title: string;
}
