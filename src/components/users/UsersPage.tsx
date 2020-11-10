import React from "react";
import { useSelector } from "react-redux";
import Preloader from "../common/Preloader";
// import { withAuthRedirect } from "../hoc/WithAuthRedirect";
import { getIsFetching } from "../../redux/selectors/user-selectors";
import { Users } from "./Users";

type UsersPagePropsType = {
  pageTitle?: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching ? <Preloader /> : <div>All users</div>}
      <Users />
    </>
  );
};
