import axios from "axios";
import { User } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";
import { ExtendedjwrPayload } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

// User login
export async function loginUser(email: string, password: string) {
  return await axios.post(`${api}/login`, { email, password });
}

// Register user
export async function registerUser(user: User) {
  return await axios.post(api, user);
}

// Get current user
export async function getCurrentUserById() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.resolve(null);
  const decoded = jwtDecode<ExtendedjwrPayload>(token as string);
  const userId = decoded._id;
  // console.log("User ID (getCurrentUserById): " + decoded._id);
  const user = await axios.get(`${api}/${userId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  // console.log("User (getCurrentUserById): " + JSON.stringify(user));

  return user;
}
