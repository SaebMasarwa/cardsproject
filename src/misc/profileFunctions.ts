import * as yup from "yup";

export const profileInitialValuesObj = {
  name: {
    first: "",
    middle: "",
    last: "",
  },
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
};

export const profileValidationSchemaObj = yup.object({
  name: yup.object({
    first: yup.string().required().min(2),
    middle: yup.string().min(2),
    last: yup.string().required().min(2),
  }),
  phone: yup.string().required().min(10),
  email: yup.string().required().email(),
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
});
