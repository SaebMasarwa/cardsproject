import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { createCard } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";

interface AddCardProps {}

const AddCard: FunctionComponent<AddCardProps> = () => {
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: yup.object({
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
    }),
    onSubmit: (values: CardType) => {
      createCard(values)
        .then((res) => {
          reactToastifySuccess("Card created successfully");
          formik.resetForm();
        })
        .catch((err) => {
          reactToastifyError("Card creation failed");
        });
    },
  });

  return (
    <>
      <div className="display-3">Create Card</div>
      <div className="container-fluid w-75">
        <form className="d-flex row" onSubmit={formik.handleSubmit}>
          <div className="mb-3 col-6">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-danger">{formik.errors.title}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="subtitle" className="form-label">
              Subtitle
            </label>
            <input
              type="text"
              className="form-control"
              id="subtitle"
              name="subtitle"
              onChange={formik.handleChange}
              value={formik.values.subtitle}
              onBlur={formik.handleBlur}
            />
            {formik.touched.subtitle && formik.errors.subtitle && (
              <p className="text-danger">{formik.errors.subtitle}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="web" className="form-label">
              Web
            </label>
            <input
              type="text"
              className="form-control"
              id="web"
              name="web"
              onChange={formik.handleChange}
              value={formik.values.web}
              onBlur={formik.handleBlur}
            />
            {formik.touched.web && formik.errors.web && (
              <p className="text-danger">{formik.errors.web}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              name="image.url"
              onChange={formik.handleChange}
              value={formik.values.image.url}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image?.url && formik.errors.image?.url && (
              <p className="text-danger">{formik.errors.image.url}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="imageAlt" className="form-label">
              Image Alt
            </label>
            <input
              type="text"
              className="form-control"
              id="imageAlt"
              name="image.alt"
              onChange={formik.handleChange}
              value={formik.values.image.alt}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image?.alt && formik.errors.image?.alt && (
              <p className="text-danger">{formik.errors.image.alt}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="address.state"
              onChange={formik.handleChange}
              value={formik.values.address.state}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address?.state && formik.errors.address?.state && (
              <p className="text-danger">{formik.errors.address.state}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="address.country"
              onChange={formik.handleChange}
              value={formik.values.address.country}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address?.country &&
              formik.errors.address?.country && (
                <p className="text-danger">{formik.errors.address.country}</p>
              )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="address.city"
              onChange={formik.handleChange}
              value={formik.values.address.city}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address?.city && formik.errors.address?.city && (
              <p className="text-danger">{formik.errors.address.city}</p>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="address.street"
              onChange={formik.handleChange}
              value={formik.values.address.street}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address?.street &&
              formik.errors.address?.street && (
                <p className="text-danger">{formik.errors.address.street}</p>
              )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="houseNumber" className="form-label">
              House Number
            </label>
            <input
              type="number"
              className="form-control"
              id="houseNumber"
              name="address.houseNumber"
              onChange={formik.handleChange}
              value={formik.values.address.houseNumber}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address?.houseNumber &&
              formik.errors.address?.houseNumber && (
                <p className="text-danger">
                  {formik.errors.address.houseNumber}
                </p>
              )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="zip" className="form-label">
              Zip
            </label>
            <input
              type="number"
              className="form-control"
              id="zip"
              name="address.zip"
              onChange={formik.handleChange}
              value={formik.values.address.zip}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address?.zip && formik.errors.address?.zip && (
              <p className="text-danger">{formik.errors.address.zip}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 w-25 mx-auto p-2"
            disabled={!formik.dirty || !formik.isValid}
          >
            Submit
          </button>
          <button
            type="reset"
            className="btn btn-warning mt-3 w-25 mx-auto p-2"
            disabled={!formik.dirty}
            onClick={formik.handleReset}
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
