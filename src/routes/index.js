import React from "react";
import NotFound from "../components/NotFound/NotFound";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Game from "../components/Game/Game";
import Home from "../containers/Home";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/singleplayer",
    exact: false,
    main: () => <Game />
  },
  {
    path: "/multiplayer",
    exact: false,
    main: () => <Game />
  },
  {
    path: "/login",
    exact: false,
    main: ({ location }) => <Login location={location} />
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
