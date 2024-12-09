import axios from "axios";
import { User } from "../interfaces/User";
import { jwtDecode, JwtPayload } from "jwt-decode";

const api: string = `${process.env.REACT_APP_API}/users`;

// Example usage of api
console.log(api);

// User login
export function loginUser(email: string, password: string) {
  return axios.post(`${api}/login`, { email, password });
}

// Register user
export function registerUser(user: User) {
  return axios.post(api, user);
}
interface ExtendedjwrPayload extends JwtPayload {
  _id: string;
  isBusniess: boolean;
  isAdmin: boolean;
  iat: number;
}
// Get current user
export function getCurrentUserById() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.resolve(null);
  const decoded = jwtDecode<ExtendedjwrPayload>(token as string);
  console.log(decoded._id);
  const user = axios.get(`${api}/${decoded._id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return user;
}
