import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { registerUser } from "../services/usersService";
import { User } from "../interfaces/User";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: yup.object({
      name: yup.object({
        first: yup.string().required().min(2),
        middle: yup.string().min(2),
        last: yup.string().required().min(2),
      }),
      phone: yup.string().required().min(10),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
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
    }),
    onSubmit: (values: User) => {
      registerUser(values)
        .then((res) => {
          localStorage.setItem("token", res.data);
          navigate("/");
        })
        .catch((err) => console.log(err));
    },
  });

  const onchangeChecked = (checked: boolean) => {
    formik.setFieldValue("isBusiness", checked);
  };
  return (
    <div className="container w-25">
      <h5 className="display-5 my-2">REGISTER</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="first"
            placeholder="John"
            name="name.first"
            value={formik.values.name.first}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="first">First Name</label>
          {formik.touched.name?.first && formik.errors.name?.first && (
            <p className="text-danger">{formik.errors.name?.first}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="middle"
            placeholder="Middle"
            name="name.middle"
            value={formik.values.name.middle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="middle">Middle Name</label>
          {formik.touched.name?.middle && formik.errors.name?.middle && (
            <p className="text-danger">{formik.errors.name.middle}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Doe"
            name="name.last"
            value={formik.values.name.last}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="lastName">Last Name</label>
          {formik.touched.name?.last && formik.errors.name?.last && (
            <p className="text-danger">{formik.errors.name.last}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="050-1234567"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="phone">Phone</label>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-danger">{formik.errors.phone}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInput">Email address</label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingPassword">Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingImageURL"
            placeholder="Image URL"
            name="image.url"
            value={formik.values.image.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingImageURL">Image URL</label>
          {formik.touched.image?.url && formik.errors.image?.url && (
            <p className="text-danger">{formik.errors.image.url}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingImageAlt"
            placeholder="Image Alt"
            name="image.alt"
            value={formik.values.image.alt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingImageAlt">Image Alt</label>
          {formik.touched.image?.alt && formik.errors.image?.alt && (
            <p className="text-danger">{formik.errors.image.alt}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingAddressState"
            placeholder="State"
            name="address.state"
            value={formik.values.address.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingAddressState">State</label>
          {formik.touched.address?.state && formik.errors.address?.state && (
            <p className="text-danger">{formik.errors.address.state}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingAddressCountry"
            placeholder="Country"
            name="address.country"
            value={formik.values.address.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingAddressCountry">Country</label>
          {formik.touched.address?.country &&
            formik.errors.address?.country && (
              <p className="text-danger">{formik.errors.address.country}</p>
            )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingAddressCity"
            placeholder="City"
            name="address.city"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingAddressCity">City</label>
          {formik.touched.address?.city && formik.errors.address?.city && (
            <p className="text-danger">{formik.errors.address.city}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingAddressStreet"
            placeholder="Street"
            name="address.street"
            value={formik.values.address.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingAddressStreet">Street</label>
          {formik.touched.address?.street && formik.errors.address?.street && (
            <p className="text-danger">{formik.errors.address.street}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingAddressHouseNumber"
            placeholder="House Number"
            name="address.houseNumber"
            value={formik.values.address.houseNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingAddressHouseNumber">House Number</label>
          {formik.touched.address?.houseNumber &&
            formik.errors.address?.houseNumber && (
              <p className="text-danger">{formik.errors.address.houseNumber}</p>
            )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingAddressZip"
            placeholder="Zip"
            name="address.zip"
            value={formik.values.address.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingAddressZip">Zip</label>
          {formik.touched.address?.zip && formik.errors.address?.zip && (
            <p className="text-danger">{formik.errors.address.zip}</p>
          )}
        </div>
        <div className="form-check w-75 m-auto mb-3 text-warning">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => onchangeChecked(e.target.checked)}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Signup as business
          </label>
        </div>
        <button
          className="btn btn-primary mt-3 w-100"
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
        >
          Register
        </button>
      </form>
      <p className="mt-3">
        <Link to="/">Already have an account? Log in</Link>
      </p>
    </div>
  );
};

export default Register;
