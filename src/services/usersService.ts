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
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<ExtendedjwrPayload>(token as string);
    const userId = decoded._id;
    const user = await axios.get(`${api}/${userId}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
