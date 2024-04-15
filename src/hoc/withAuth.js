import { Fragment, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../constants/routes";

const WithAuth = () => {
  const { getIsLoggedIn } = useContext(AppContext);

  // if not logged in redirect to login page
  if (!getIsLoggedIn()) return <Navigate to={routes.login} replace />;

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default WithAuth;
