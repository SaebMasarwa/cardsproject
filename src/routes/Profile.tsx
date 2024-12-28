import { FunctionComponent, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { NavigateFunction, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { Field, Form, Formik } from "formik";
import { updateUser, updateUserBusinessStatus } from "../services/usersService";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";
import {
  profileInitialValuesObj,
  profileValidationSchemaObj,
} from "../misc/profileFunctions";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div>
      <h5 className="display-5 my-2">Profile - {user?.name.first}</h5>
      {user && (
        <div>
          <div className="card m-3">
            <div className="card-body d-flex flex-row justify-content-center align-items-center">
              <div>
                <img
                  src={user.image.url}
                  className="card-img-top w-25"
                  alt={user.image.alt}
                />
              </div>
              <div>
                <h5 className="card-title">
                  Full Name: {user?.name.first} "{user?.name.middle}"{" "}
                  {user?.name.last}
                </h5>
                <p className="card-text">
                  <i className="bi bi-envelope-at  me-2"></i>
                  {user?.email}
                </p>
                <p className="card-text">
                  <i className="bi bi-telephone me-2"></i>
                  {user?.phone}
                </p>
                <p className="card-text">
                  Address: {user?.address.city}, {user?.address.state},{" "}
                  {user?.address.country}
                </p>
                <p className="card-text">Zip Code: {user?.address.zip}</p>
                <p className="card-text">Street: {user?.address.street}</p>
              </div>
            </div>
          </div>
          <h5 className="display-5 my-2">Edit Profile </h5>
          <Formik
            initialValues={user ? user : profileInitialValuesObj}
            validationSchema={profileValidationSchemaObj}
            enableReinitialize={true}
            onSubmit={(userEdit, actions) => {
              if (user._id) {
                updateUserBusinessStatus(user._id)
                  .then((res) => {
                    if (res) {
                      setUser({ ...user, ...res.data });
                    }
                  })
                  .catch((error) => {
                    reactToastifyError("Updating business status failed");
                    console.log(error);
                  });
                updateUser(user._id, {
                  name: {
                    first: userEdit.name.first,
                    middle: userEdit.name.middle,
                    last: userEdit.name.last,
                  },
                  phone: userEdit.phone,
                  image: {
                    url: userEdit.image.url,
                    alt: userEdit.image.alt,
                  },
                  address: {
                    state: userEdit.address.state,
                    country: userEdit.address.country,
                    city: userEdit.address.city,
                    street: userEdit.address.street,
                    houseNumber: userEdit.address.houseNumber,
                    zip: userEdit.address.zip,
                  },
                })
                  .then((res) => {
                    if (res) {
                      setUser(res.data);
                      navigate("/profile");
                      reactToastifySuccess("User updated successfully");
                    } else {
                      reactToastifyError("User update failed");
                    }
                  })
                  .catch((error) => {
                    reactToastifySuccess("User update failed");
                    console.log(error);
                  });
              }
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleReset, dirty, setFieldValue }) => (
              <Form className="d-flex flex-row flex-wrap justify-content-center">
                <InputField
                  label="First Name"
                  name="name.first"
                  value={values.name.first}
                />
                <InputField
                  label="Middle Name"
                  name="name.middle"
                  value={values.name.middle}
                />
                <InputField
                  label="Last Name"
                  name="name.last"
                  value={values.name.last}
                />
                <InputField label="Phone" name="phone" value={values.phone} />
                <InputField
                  label="Image URL"
                  name="image.url"
                  value={values.image.url}
                />
                <InputField
                  label="Image alt"
                  name="image.alt"
                  value={values.image.alt}
                />
                <InputField
                  label="State"
                  name="address.state"
                  value={values.address.state}
                />
                <InputField
                  label="Country"
                  name="address.country"
                  value={values.address.country}
                />
                <InputField
                  label="City"
                  name="address.city"
                  value={values.address.city}
                />
                <InputField
                  label="Street"
                  name="address.street"
                  value={values.address.street}
                />
                <InputField
                  label="Houst Number"
                  name="address.houseNumber"
                  value={values.address.houseNumber}
                />
                <InputField
                  label="Zip Code"
                  name="address.zip"
                  value={values.address.zip}
                />
                <div className="d-flex flex-row justify-content-center w-100">
                  <Field
                    className="form-check"
                    type="checkbox"
                    name="isBusiness"
                    id="isBusiness"
                    onChange={(e: { target: { checked: boolean } }) => {
                      setFieldValue("isBusiness", e.target.checked);
                    }}
                  />
                  <label className="form-check" htmlFor="isBusiness">
                    Sign up as a business?
                  </label>
                </div>
                <div className="d-flex flex-row justify-content-center w-100">
                  <button
                    className="btn btn-primary mt-3 col-5 me-2"
                    type="submit"
                    disabled={!dirty}
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
export default Profile;
