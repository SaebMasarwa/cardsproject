import * as yup from "yup";
import {
  getCurrentUserById,
  loginUser,
  registerUser,
} from "../services/usersService";
import { reactToastifySuccess, reactToastifyError } from "./reactToastify";
import { User } from "../interfaces/User";

export const initialValuesObj = {
  name: {
    first: "",
    middle: "",
    last: "",
  },
  email: "",
  password: "",
  phone: "",
  image: {
    url: "",
    alt: "",
  },
  address: {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: 0,
    zip: 0,
  },
  isBusiness: false,
  isAdmin: false,
};

export const validationSchemaObj = yup.object({
  name: yup.object({
    first: yup.string().required().min(2),
    middle: yup.string().min(2),
    last: yup.string().required().min(2),
  }),
  phone: yup.string().required().min(10),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[*_0&^%$#@!])(?=.*.{4,}).{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and must be at least 8 characters long"
    )
    .min(8),
  image: yup.object({
    url: yup.string().required().url(),
    alt: yup.string().required().min(2),
  }),
  address: yup.object({
    state: yup.string().required().min(2),
    country: yup.string().required().min(2),
    city: yup.string().required().min(2),
    street: yup.string().required().min(2),
    houseNumber: yup.number().required().min(1),
    zip: yup.number().required().min(1),
  }),
  isBusiness: yup.boolean(),
});

export const onSubmitObj = (
  values: User,
  setUser: (user: User | null) => void,
  navigate: (arg0: string) => void
) => {
  console.log("Register" + JSON.stringify(values));
  registerUser(values)
    .then((res) => {})
    .then(() => {
      loginUser(values.email, values.password)
        .then((res) => {
          if (res.data.length) {
            localStorage.setItem("token", res.data);
            getCurrentUserById().then((res) => {
              if (res) {
                setUser(res.data);
                reactToastifySuccess(
                  "Registration & Login successful, redirected to home page"
                );
                navigate("/");
              }
            });
          } else {
            reactToastifyError("No such user");
          }
        })
        .catch((err) => {
          reactToastifyError("Login failed");
        });
    })
    .catch((err) => {
      reactToastifyError("Registeration failed");
    });
};
