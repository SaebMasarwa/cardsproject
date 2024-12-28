import axios from "axios";
import { User, UserEditType } from "../interfaces/User";
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

// Get all users
export async function getAllUsers() {
  try {
    const token = localStorage.getItem("token");
    const users = await axios.get(`${api}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Delete user
export async function deleteUser(userId: string) {
  try {
    const token = localStorage.getItem("token");
    const user = await axios.delete(`${api}/${userId}`, {
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

// Update biusiness status
export async function updateUserBusinessStatus(userId: string) {
  try {
    const token = localStorage.getItem("token");
    const user = await axios.patch(
      `${api}/${userId}`,
      {},
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Update user
export async function updateUser(userId: string, user: UserEditType) {
  try {
    const token = localStorage.getItem("token");
    const updatedUser = await axios.put(`${api}/${userId}`, user, {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log(updatedUser);

    return updatedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}
