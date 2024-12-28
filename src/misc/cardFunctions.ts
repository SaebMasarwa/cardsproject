import * as yup from "yup";
import { createCard } from "../services/cardsService";
import { reactToastifyError, reactToastifySuccess } from "./reactToastify";
export const cardInitialValuesObj = {
  title: "",
  subtitle: "",
  description: "",
  phone: "",
  email: "",
  web: "",
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
};

export const cardValidationSchema = yup.object({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  description: yup.string().required(),
  phone: yup.string().required().min(10),
  email: yup.string().required().email(),
  web: yup.string().required(),
  image: yup.object({
    url: yup.string().required().url(),
    alt: yup.string().required(),
  }),
  address: yup.object({
    state: yup.string().required().min(2),
    country: yup.string().required().min(2),
    city: yup.string().required().min(2),
    street: yup.string().required().min(2),
    houseNumber: yup.number().required().min(1),
    zip: yup.number().required().min(1),
  }),
});

export const cardOnSubmit = (values: any) => {
  createCard(values)
    .then((res) => {
      reactToastifySuccess("Card created successfully");
    })
    .catch((err) => {
      reactToastifyError("Card creation failed");
    });
};
