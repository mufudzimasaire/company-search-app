import { Address } from "./address.model";

export interface OfficerList {
  etag: string;
  items: Officer[];
  items_per_page: number;
  kind: string;
  links: {
    self: string;
  },
}

export interface Officer {
  address: Address;
  appointed_on: string;
  country_of_residence: string;
  date_of_birth: {
    month: number;
    year: number;
  };
  links: {
    officer: {
      appointments: string;
    }
  };
  name: string;
  nationality: string;
  occupation: string;
  officer_role: string;
}
