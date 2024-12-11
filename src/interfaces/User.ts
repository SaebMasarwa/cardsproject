import { JwtPayload } from "jwt-decode";

export interface User {
  name: {
    first: string;
    middle?: string;
    last?: string;
  };
  phone: string;
  email: string;
  password: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
}

export interface ExtendedjwrPayload extends JwtPayload {
  _id: string;
  isBusniess: boolean;
  isAdmin: boolean;
  iat: number;
}
