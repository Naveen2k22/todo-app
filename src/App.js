import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./routes/errorRoute";
import routes from "./constants/routes";
import Login from "./routes/login";
import Register from "./routes/register";

import "@arco-design/web-react/dist/css/arco.css";
import Home from "./routes/home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
