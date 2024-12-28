import { JwtPayload } from "jwt-decode";

// User type for user data in registeration and login
export type User = {
  _id?: string;
  name: {
    first: string;
    middle: string;
    last: string;
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
  isBusiness?: boolean;
  isAdmin?: boolean;
};

export type UserEditType = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
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
};

export interface ExtendedjwrPayload extends JwtPayload {
  _id: string;
  isBusniess: boolean;
  isAdmin: boolean;
  iat: number;
}
