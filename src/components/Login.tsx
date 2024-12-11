import { FunctionComponent } from "react";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { loginUser } from "../services/usersService";
import { userManagement } from "../hooks/useUser";

interface LoginProps {
  setRenderControl: (control: boolean) => void;
}

const Login: FunctionComponent<LoginProps> = ({ setRenderControl }) => {
  const navigate: NavigateFunction = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: ({ email, password }: FormikValues) => {
      loginUser(email, password)
        .then((res) => {
          console.log(res);
          if (res.data.length) {
            navigate("/");
            localStorage.setItem("token", res.data);
            setRenderControl(true);
            userManagement.renderControl = true;
          } else {
            alert("No such user");
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="container w-25">
      <h5 className="display-5 my-2">LOGIN</h5>
      <form onSubmit={formik.handleSubmit}>
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
          {formik.touched.email &&
            formik.errors.email &&
            typeof formik.errors.email === "string" && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
        </div>
        <div className="form-floating">
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
          {formik.touched.password &&
            formik.errors.password &&
            typeof formik.errors.password === "string" && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
        </div>
        <button
          className="btn btn-primary mt-3 w-100"
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
        >
          Login
        </button>
      </form>
      <p className="mt-3">
        <Link to="/register">New user? Register now</Link>
      </p>
    </div>
  );
};

export default Login;
