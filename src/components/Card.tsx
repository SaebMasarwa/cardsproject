import { useContext, useEffect, useState } from "react";
import type { CardType } from "../interfaces/Card";
import { deleteCard } from "../services/cardsService";
import { UserContext } from "../context/userContext";
import { Link, NavLink } from "react-router-dom";
import LikeButton from "./LikeButton";
import { User } from "../interfaces/User";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";

export default function Card({ card }: { card: CardType }) {
  const { user } = useContext(UserContext);
  const [deletePermitted, setDeletePermitted] = useState(false);
  const [editPermitted, setEditPermitted] = useState(false);

  const handleDelete = (
    bizNumber: number,
    cardId: string,
    user: User,
    cardUserId: string
  ) => {
    if (user?.isAdmin) {
      deleteCard(bizNumber, cardId);
      reactToastifySuccess("Card deleted successfully");
    } else if (user?._id === cardUserId) {
      deleteCard(bizNumber, cardId);
      reactToastifySuccess("Card deleted successfully");
    } else {
      reactToastifyError("You are not authorized to delete this card");
    }
  };

  const handleEdit = (cardUserId: string, user: User) => {
    if (user?.isAdmin) {
      setEditPermitted(true);
      // reactToastifySuccess("Card edited successfully");
    } else if (user?._id === cardUserId) {
      setEditPermitted(true);
      // reactToastifySuccess("Card edited successfully");
    } else {
      reactToastifyError("You are not authorized to edit this card");
    }
  };
  useEffect(() => {
    if (user?._id === card.user_id) {
      setDeletePermitted(true);
      handleEdit(card.user_id as string, user as User);
    }
  }, [user, card.user_id]);

  return (
    <>
      <div
        className="card m-3 d-flex"
        style={{ width: "18rem" }}
        key={card._id}
      >
        <img
          src={card.image.url}
          className="card-img-top"
          alt={card.image.alt}
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
          <div className="d-flex justify-content-center align-items-end">
            {user?.isAdmin === false && user && deletePermitted && (
              <NavLink
                to="
            "
                className="btn btn-outline-danger me-3"
                onClick={() => {
                  if (user._id === card.user_id) setDeletePermitted(true);
                  window.confirm(
                    "Are you sure you want to delete this card?"
                  ) &&
                    handleDelete(
                      card.bizNumber as number,
                      card._id as string,
                      user,
                      card.user_id as string
                    );
                }}
              >
                <i className="bi bi-trash"></i>
              </NavLink>
            )}
            {user?.isAdmin && (
              <Link
                to="
            "
                className="btn btn-outline-danger me-3"
                onClick={() => {
                  window.confirm(
                    "Are you sure you want to delete this card?"
                  ) &&
                    handleDelete(
                      card.bizNumber as number,
                      card._id as string,
                      user,
                      card.user_id as string
                    );
                }}
              >
                <i className="bi bi-trash"></i>
              </Link>
            )}
            {user?.isAdmin === false && user && editPermitted && (
              <Link
                to={`/editcard/${card._id}`}
                className="btn btn-outline-warning me-3"
              >
                <i className="bi bi-pencil"></i>
              </Link>
            )}
            {user?.isAdmin && (
              <Link
                to={`/editcard/${card._id}`}
                className="btn btn-outline-warning me-3"
              >
                <i className="bi bi-pencil"></i>
              </Link>
            )}
            <Link
              to={`tel:${card.phone}`}
              className="btn btn-outline-info me-3"
            >
              <i className="bi bi-telephone-fill"></i>
            </Link>
            {user && card._id && <LikeButton cardId={card._id} />}
          </div>
          <Link
            to={("/displaycard/" + card._id) as string}
            className="btn btn-primary mt-3"
          >
            Visit Card
          </Link>
        </div>
      </div>
    </>
  );
}
