import { Form, Formik, useFormik } from "formik";
import { FunctionComponent } from "react";
import { CardType } from "../interfaces/Card";
import {
  cardInitialValuesObj,
  cardOnSubmit,
  cardValidationSchema,
} from "../misc/cardFunctions";
import InputField from "../components/InputField";

interface AddCardProps {}

const AddCard: FunctionComponent<AddCardProps> = () => {
  const formik = useFormik({
    initialValues: cardInitialValuesObj,
    validationSchema: cardValidationSchema,
    onSubmit: (values: CardType) => {
      cardOnSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="display-3">Create Card</div>
      <Formik
        initialValues={cardInitialValuesObj}
        validationSchema={cardValidationSchema}
        onSubmit={cardOnSubmit}
      >
        {({ handleReset, isValid, dirty }) => (
          <div className="container w-75 mt-3">
            <Form className="d-flex flex-row flex-wrap justify-content-center">
              <InputField label="Title" name="title" />
              <InputField label="Subtitle" name="subtitle" />
              <InputField label="Description" name="description" />
              <InputField label="Phone" name="phone" />
              <InputField label="Email" type="email" name="email" />
              <InputField label="Web" name="web" />
              <InputField label="Image URL" name="image.url" />
              <InputField label="Image Alt" name="image.alt" />
              <InputField label="State" name="address.state" />
              <InputField label="Country" name="address.country" />
              <InputField label="City" name="address.city" />
              <InputField label="Street" name="address.street" />
              <InputField label="House Number" name="address.houseNumber" />
              <InputField label="Zip" name="address.zip" />
              <button
                className="btn btn-primary mt-3 col-5 me-2"
                type="submit"
                disabled={!dirty || !isValid}
              >
                Submit
              </button>
              <button
                className="btn btn-warning mt-3 col-5 me-2"
                type="reset"
                disabled={!dirty || !isValid}
                onClick={handleReset}
              >
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AddCard;
