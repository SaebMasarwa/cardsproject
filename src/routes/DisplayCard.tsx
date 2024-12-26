import { FunctionComponent, useContext, useEffect, useState } from "react";
import {
  NavigateFunction,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { getCardById } from "../services/cardsService";
import { CardType } from "../interfaces/Card";
import { reactToastifyError } from "../misc/reactToastify";
import { getGeolocationByCity } from "../services/openweatherAPIService";
import MapContainerDisplay from "../components/MapContainer";
import LikeButton from "../components/LikeButton";
import { UserContext } from "../context/userContext";

interface DisplayCardProps {}

const DisplayCard: FunctionComponent<DisplayCardProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [DisplayedCard, setDisplayedCard] = useState<CardType | null>();
  const [location, setLocation] = useState<number[]>();

  const fetchData = async () => {
    try {
      getCardById(id as string)
        .then((res) => {
          setDisplayedCard(res?.data);
          getGeolocationByCity(res?.data.address.city as string)
            .then((res) => {
              setLocation([res[0].lat, res[0].lon]);
            })
            .catch((error) => {
              reactToastifyError("Address not found");
            });
        })
        .catch((error) => {
          reactToastifyError(
            "Card not found, redirecting to previous page in 2 seconds"
          );
        });
    } catch (error) {
      reactToastifyError(
        "Card not found, redirecting to previous page in 2 seconds"
      );
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="display-3">Display Card</div>
      <div className="container-fluid displaycard">
        {DisplayedCard != null && (
          <div className="card m-3">
            <div className="card-header">
              <h5 className="card-title">{DisplayedCard?.title}</h5>
            </div>
            <div className="card-body d-flex">
              <img
                src={DisplayedCard?.image.url}
                className="card-img-top w-50"
                alt={DisplayedCard?.image.alt}
              />
              <div className="p-3">
                <h3 className="card-title">{DisplayedCard?.title}</h3>
                <h5 className="card-subtitle mb-2">
                  {DisplayedCard?.subtitle}
                </h5>
                <p className="card-text"> {DisplayedCard?.description}</p>
                <i className="bi bi-telephone"></i> {DisplayedCard?.phone}
                <i className="bi bi-envelope-at ms-2">
                  {" "}
                  {DisplayedCard?.email}
                </i>
                <i className="bi bi-link-45deg  ms-2"></i>
                <Link to={DisplayedCard?.web} className="text-decoration-none">
                  Website
                </Link>
                <p className="card-text">
                  {DisplayedCard?.address.city}
                  {", "}
                  {DisplayedCard?.address.state}
                  {", "}
                  {DisplayedCard?.address.country}
                </p>
              </div>
            </div>

            <div className="card-footer">
              {DisplayedCard && location && (
                <MapContainerDisplay location={location} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayCard;
