import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import routes from "../constants/routes";
import labels from "../constants/labels";
import ButtonLink from "./ButtonLink";
import { Button } from "@arco-design/web-react";

const Navbar = () => {
  const location = useLocation();

  const { getIsLoggedIn, getLoginDetails, logout } = useContext(AppContext);
  console.log(getLoginDetails("token"), getIsLoggedIn());

  const getRouteObject = () => {
    if (location.pathname.startsWith(routes.login)) {
      return {
        href: routes.register,
        label: labels.register,
      };
    } else if (location.pathname.startsWith(routes.register)) {
      return {
        href: routes.login,
        label: labels.login,
      };
    }
  };

  return (
    <nav className="border-2 border-white bg-[var(--color-neutral-2)]">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <p className="text-2xl leading-4">
          {getIsLoggedIn()
            ? `Hi ${getLoginDetails("name") || getLoginDetails("email") || ""} !`
            : null}
        </p>
        <div className="flex items-center space-x-6">
          {getIsLoggedIn() ? (
            <Button type="text" onClick={logout}>
              Logout
            </Button>
          ) : getRouteObject() ? (
            <ButtonLink href={getRouteObject().href}>
              <Button type="text">{getRouteObject().label}</Button>
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
