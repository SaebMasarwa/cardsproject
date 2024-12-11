import axios from "axios";
import { User } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";
import { ExtendedjwrPayload } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

// User login
export function loginUser(email: string, password: string) {
  return axios.post(`${api}/login`, { email, password });
}

// Register user
export function registerUser(user: User) {
  return axios.post(api, user);
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
