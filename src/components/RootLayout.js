import { Outlet } from "react-router-dom";
import { AppContextProvider } from "../context/AppContext";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <AppContextProvider>
      <Navbar />
      <Outlet />
    </AppContextProvider>
  );
};

export default RootLayout;
