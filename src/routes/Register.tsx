import { Field, Form, Formik } from "formik";
import { FunctionComponent, useContext } from "react";
import {
  initialValuesObj,
  onSubmitObj,
  validationSchemaObj,
} from "../misc/registerFunction";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import InputField from "../components/InputField";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { setUser } = useContext(UserContext);
  return (
    <>
      <Formik
        initialValues={initialValuesObj}
        validationSchema={validationSchemaObj}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          onSubmitObj(values, setUser, navigate);
        }}
      >
        {({ setFieldValue, handleReset, isValid, dirty }) => (
          <div className="container w-50">
            <Form className="d-flex flex-row flex-wrap justify-content-center">
              <InputField label="First Name" name="name.first" />
              <InputField label="Middle Name" name="name.middle" />
              <InputField label="Last Name" name="name.last" />
              <InputField label="Phone" name="phone" />
              <InputField label="Email Address" type="email" name="email" />
              <InputField label="Password" type="password" name="password" />
              <InputField label="Image URL" name="image.url" />
              <InputField label="Image alt" name="image.alt" />
              <InputField label="State" name="address.state" />
              <InputField label="Country" name="address.country" />
              <InputField label="City" name="address.city" />
              <InputField label="Street" name="address.street" />
              <InputField label="Houst Number" name="address.houseNumber" />
              <InputField label="Zip Code" name="address.zip" />
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
                  disabled={!isValid || !dirty}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-warning mt-3 p-2 col-5"
                  disabled={!isValid || !dirty}
                  onClick={() => {
                    handleReset();
                  }}
                >
                  Reset
                </button>
              </div>
            </Form>
            <p className="mt-4">
              <Link to="/">Already have an account? Log in</Link>
            </p>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Register;
