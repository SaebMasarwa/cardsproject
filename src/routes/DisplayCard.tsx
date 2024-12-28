import { FunctionComponent, useEffect, useState } from "react";
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

interface DisplayCardProps {}

const DisplayCard: FunctionComponent<DisplayCardProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [displayedCard, setDisplayedCard] = useState<CardType | null>();
  const [location, setLocation] = useState<number[]>();

  const fetchCard = async () => {
    await getCardById(id as string)
      .then((res) => {
        if (res) {
          setDisplayedCard(res.data);
        } else {
          reactToastifyError(
            "Error loading card, redirecting to previous page in 2 seconds"
          );
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      })
      .catch((error) => {
        reactToastifyError(
          "Card not found, redirecting to previous page in 2 seconds"
        );
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      });
  };

  const fetchLocation = async () => {
    if (displayedCard) {
      console.log(displayedCard.address.city);

      getGeolocationByCity(displayedCard.address.city)
        .then((res) => {
          console.log(res);
          console.log(res[0].lat, res[0].lon);

          setLocation([res[0].lat, res[0].lon]);
        })
        .catch((error) => {
          reactToastifyError("Address not found");
        });
    }
  };

  useEffect(() => {
    fetchCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedCard]);

  return (
    <>
      <div className="display-3">Display Card</div>
      <div className="container-fluid displaycard">
        {displayedCard != null && (
          <div className="card m-3">
            <div className="card-header">
              <h5 className="card-title">{displayedCard.title}</h5>
            </div>
            <div className="card-body d-flex">
              <img
                src={displayedCard.image.url}
                className="card-img-top w-50"
                alt={displayedCard.image.alt}
              />
              <div className="p-3">
                <h3 className="card-title">{displayedCard.title}</h3>
                <h5 className="card-subtitle mb-2">{displayedCard.subtitle}</h5>
                <p className="card-text"> {displayedCard.description}</p>
                <i className="bi bi-telephone"></i> {displayedCard.phone}
                <i className="bi bi-envelope-at ms-2"> {displayedCard.email}</i>
                <i className="bi bi-link-45deg  ms-2"></i>
                <Link to={displayedCard.web} className="text-decoration-none">
                  Website
                </Link>
                <p className="card-text">
                  Address: {displayedCard.address.city}
                  {", "}
                  {displayedCard.address.state}
                  {", "}
                  {displayedCard.address.country}
                </p>
              </div>
            </div>

            <div className="card-footer">
              {displayedCard && location && (
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
