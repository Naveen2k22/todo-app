import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../constants/routes";
import { getSessionAuthData, setSessionData } from "../utils/getSessionData";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState(
    getSessionAuthData("loginDetails", {}),
  );

  const getIsLoggedIn = () => getLoginDetails("token");

  const getLoginDetails = (name) => loginDetails?.[name];

  const logout = () => {
    setLoginDetails({});
    navigate(routes.login);
  };

  useEffect(() => {
    if (loginDetails) {
      const sessionData = { ...loginDetails };
      delete sessionData.password;
      setSessionData("loginDetails", loginDetails);
    }
  }, [loginDetails]);

  return (
    <AppContext.Provider
      value={{
        getIsLoggedIn,
        setLoginDetails,
        getLoginDetails,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
