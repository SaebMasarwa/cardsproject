import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  deleteUser,
  getAllUsers,
  updateUserBusinessStatus,
} from "../services/usersService";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";
import { User } from "../interfaces/User";
import { Pagination } from "react-bootstrap";

interface SandboxProps {}

const Sandbox: FunctionComponent<SandboxProps> = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);
  const [userBusinessStatus, setUserBusinessStatus] = useState(
    user?.isBusiness
  );
  const [usersListChanged, setUsersListChanged] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [userPaginationStart, setUserPaginationStart] = useState(0);
  const [userPaginationEnd, setUserPaginationEnd] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const start = (page - 1) * 100;
    const end = start + 100;
    setUserPaginationStart(start);
    setUserPaginationEnd(end);
  };

  const fetchData = async () => {
    getAllUsers()
      .then((res) => {
        if (res) {
          console.log(res);
          setIsLoading(true);
          setUsers(res?.data);
        } else {
          reactToastifyError("Failed to fetch users");
        }
      })
      .catch((err) => {
        reactToastifyError("Failed to fetch users");
        console.log(err);
      });
  };

  const handleBusinessStatus = (userId: string) => {
    updateUserBusinessStatus(userId)
      .then((res) => {
        if (res) {
          console.log(res);
          reactToastifySuccess("Business status updated");
        } else {
          reactToastifyError("Failed to update business status");
        }
      })
      .catch((err) => {
        reactToastifyError("Failed to update business status");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [usersListChanged, userBusinessStatus]);

  const usersToDisplay = users
    .slice(userPaginationStart, userPaginationEnd)
    .map((user: User) => {
      return (
        <>
          <tr>
            <td>{user.name.first}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "Yes" : "No"}</td>
            <td>
              {user.isBusiness ? (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked
                    onClick={() => {
                      user._id && handleBusinessStatus(user._id);
                      setUserBusinessStatus(false);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Business
                  </label>
                </div>
              ) : (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onClick={() => {
                      user._id && handleBusinessStatus(user._id);
                      setUserBusinessStatus(true);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Business
                  </label>
                </div>
              )}
            </td>
            <td>
              {user.isAdmin ? (
                <button className="btn btn-danger" disabled>
                  Delete
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    window.confirm(
                      "Are you sure you want to delete this user?"
                    );
                    deleteUser(user._id as string);
                    setUsersListChanged(true);
                  }}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        </>
      );
    });

  return (
    <>
      {user?.isAdmin && (
        <>
          <div className="display-3">Sandbox</div>
          <Pagination className="d-flex justify-content-center my-3">
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev
              onClick={() =>
                onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1)
              }
            />
            {Array.from({ length: Math.ceil(users.length / 100) }).map(
              (el, index) => {
                return (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => onPageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              }
            )}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
            <Pagination.Last
              onClick={() => onPageChange(Math.ceil(users.length / 100))}
            />
          </Pagination>
          <table className="table table-striped table-hover table-bordered w-75 mx-auto my-3">
            <tr>
              <th>First Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Business</th>
              <th>Delete</th>
            </tr>
            <tbody>{usersToDisplay}</tbody>
          </table>
          <Pagination className="d-flex justify-content-center my-3">
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev
              onClick={() =>
                onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1)
              }
            />
            {Array.from({ length: Math.ceil(users.length / 100) }).map(
              (el, index) => {
                return (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => onPageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              }
            )}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
            <Pagination.Last
              onClick={() => onPageChange(Math.ceil(users.length / 100))}
            />
          </Pagination>
        </>
      )}
    </>
  );
};

export default Sandbox;
