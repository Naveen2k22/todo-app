import { NavLink } from "react-router-dom";

const ButtonLink = ({ href, children }) => {
  return <NavLink to={href}>{children}</NavLink>;
};

export default ButtonLink;
