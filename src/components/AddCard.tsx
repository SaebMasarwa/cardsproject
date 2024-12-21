import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";

interface AddCardProps {}

const AddCard: FunctionComponent<AddCardProps> = () => {
  const formik: FormikValues = useFormik({
    initialValues: { title: "", description: "", imageUrl: "" },
    onSubmit: (values: FormikValues) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className="display-3">Create Card</div>
      <div className="container w-50">
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Description"
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              placeholder="Image URL"
            />
            <label htmlFor="imageUrl">Image URL</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
