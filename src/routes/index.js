import React from "react";
import NotFound from "../components/NotFound/NotFound";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Game from "../containers/Game";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Game />
  },
  {
    path: "/login",
    exact: false,
    main: () => <Login />
  },
  {
    path: "/register",
    exact: false,
    main: () => <Register />
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />
  }
];

export default routes;
