import { FunctionComponent, useContext } from "react";
import { UserContext } from "../context/userContext";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h5 className="display-5 my-2">Profile - {user?.name.first}</h5>
    </>
  );
};

export default Profile;
