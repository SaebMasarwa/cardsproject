import { Form, Formik, useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { NavigateFunction, useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getCardById, updateCard } from "../services/cardsService";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";
import { CardType } from "../interfaces/Card";
import {
  cardInitialValuesObj,
  cardValidationSchema,
} from "../misc/cardFunctions";
import InputField from "../components/InputField";

interface EditCardProps {}

const EditCard: FunctionComponent<EditCardProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [editedCard, setEditedCard] = useState<CardType>(cardInitialValuesObj);

  useEffect(() => {
    getCardById(id as string)
      .then((res) => {
        if (res === null) {
          reactToastifyError("Card not found redirecting to previous page");
          navigate(-1);
        } else {
          setEditedCard(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        reactToastifyError("Card not found redirecting to previous page");
        navigate(-1);
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formik.setValues(editedCard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedCard]);

  const formik = useFormik({
    initialValues: editedCard,
    enableReinitialize: true,
    validationSchema: cardValidationSchema,
    onSubmit: (values: CardType) => {
      updateCard(id as string, {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        phone: values.phone,
        email: values.email,
        web: values.web,
        image: {
          url: values.image.url,
          alt: values.image.alt,
        },
        address: {
          state: values.address.state,
          country: values.address.country,
          city: values.address.city,
          street: values.address.street,
          houseNumber: values.address.houseNumber,
          zip: values.address.zip,
        },
      })
        .then((res) => {
          reactToastifySuccess("Card updated successfully");
          navigate(-1);
        })
        .catch((err) => {
          reactToastifyError("Card update failed");
        });
    },
  });

  return (
    <>
      <div className="display-3">Edit Card</div>

      <Formik
        initialValues={editedCard}
        validationSchema={cardValidationSchema}
        enableReinitialize={true}
        onSubmit={(values: CardType) => {
          updateCard(id as string, {
            title: values.title,
            subtitle: values.subtitle,
            description: values.description,
            phone: values.phone,
            email: values.email,
            web: values.web,
            image: {
              url: values.image.url,
              alt: values.image.alt,
            },
            address: {
              state: values.address.state,
              country: values.address.country,
              city: values.address.city,
              street: values.address.street,
              houseNumber: values.address.houseNumber,
              zip: values.address.zip,
            },
          })
            .then((res) => {
              reactToastifySuccess("Card updated successfully");
              navigate(-1);
            })
            .catch((err) => {
              reactToastifyError("Card update failed");
            });
        }}
      >
        {({ handleReset, isValid, dirty }) => (
          <div className="container w-75">
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
                className="btn btn-primary mt-3 col-10"
                type="submit"
                disabled={!isValid || !dirty}
              >
                Update
              </button>
              <button
                className="btn btn-warning mt-3 col-5 mx-auto me-2"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger mt-3 col-5 mx-auto"
                type="reset"
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

export default EditCard;
