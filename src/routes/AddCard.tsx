import { useFormik } from "formik";
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
        <form
          className="d-flex flex-row flex-wrap justify-content-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="title">Title</label>
            {formik.touched.title && formik.errors.title && (
              <p className="text-danger">{formik.errors.title}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="subtitle"
              placeholder="Enter subtitle"
              name="subtitle"
              onChange={formik.handleChange}
              value={formik.values.subtitle}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="subtitle" className="form-label">
              Subtitle
            </label>
            {formik.touched.subtitle && formik.errors.subtitle && (
              <p className="text-danger">{formik.errors.subtitle}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="description" className="form-label">
              Description
            </label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="web"
              placeholder="Enter website URL"
              name="web"
              onChange={formik.handleChange}
              value={formik.values.web}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="web" className="form-label">
              Web
            </label>
            {formik.touched.web && formik.errors.web && (
              <p className="text-danger">{formik.errors.web}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              placeholder="Enter image URL"
              name="image.url"
              onChange={formik.handleChange}
              value={formik.values.image.url}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            {formik.touched.image?.url && formik.errors.image?.url && (
              <p className="text-danger">{formik.errors.image.url}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="imageAlt"
              placeholder="Enter image alt title"
              name="image.alt"
              onChange={formik.handleChange}
              value={formik.values.image.alt}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="imageAlt" className="form-label">
              Image Alt
            </label>
            {formik.touched.image?.alt && formik.errors.image?.alt && (
              <p className="text-danger">{formik.errors.image.alt}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="state"
              placeholder="Enter state"
              name="address.state"
              onChange={formik.handleChange}
              value={formik.values.address.state}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="state" className="form-label">
              State
            </label>
            {formik.touched.address?.state && formik.errors.address?.state && (
              <p className="text-danger">{formik.errors.address.state}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="Enter country"
              name="address.country"
              onChange={formik.handleChange}
              value={formik.values.address.country}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="country" className="form-label">
              Country
            </label>
            {formik.touched.address?.country &&
              formik.errors.address?.country && (
                <p className="text-danger">{formik.errors.address.country}</p>
              )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Enter city"
              name="address.city"
              onChange={formik.handleChange}
              value={formik.values.address.city}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="city" className="form-label">
              City
            </label>
            {formik.touched.address?.city && formik.errors.address?.city && (
              <p className="text-danger">{formik.errors.address.city}</p>
            )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="text"
              className="form-control"
              id="street"
              placeholder="Enter street"
              name="address.street"
              onChange={formik.handleChange}
              value={formik.values.address.street}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="street" className="form-label">
              Street
            </label>
            {formik.touched.address?.street &&
              formik.errors.address?.street && (
                <p className="text-danger">{formik.errors.address.street}</p>
              )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="number"
              className="form-control"
              id="houseNumber"
              placeholder="Enter house number"
              name="address.houseNumber"
              onChange={formik.handleChange}
              value={formik.values.address.houseNumber}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="houseNumber" className="form-label">
              House Number
            </label>
            {formik.touched.address?.houseNumber &&
              formik.errors.address?.houseNumber && (
                <p className="text-danger">
                  {formik.errors.address.houseNumber}
                </p>
              )}
          </div>
          <div className="form-floating mb-3 col-5 me-2">
            <input
              type="number"
              className="form-control"
              id="zip"
              placeholder="Enter zip"
              name="address.zip"
              onChange={formik.handleChange}
              value={formik.values.address.zip}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="zip" className="form-label">
              Zip
            </label>
            {formik.touched.address?.zip && formik.errors.address?.zip && (
              <p className="text-danger">{formik.errors.address.zip}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 col-3 mx-auto p-2"
            disabled={!formik.dirty || !formik.isValid}
          >
            Submit
          </button>
          <button
            type="reset"
            className="btn btn-warning mt-3 col-3 mx-auto p-2"
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