import React from "react";
import NotFound from "../components/NotFound/NotFound";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import Game from "../components/Game/Game";
import Home from "../containers/Home";
import SingleModeGame from "../components/Game/SingleModeGame";
import OnlineModeGame from "../components/Game/OnlineModeGame";
import Profile from "../components/Profile/Profile";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />
  },
  {
    path: "/profile",
    exact: true,
    main: () => <Profile />
  },
  {
    path: "/singleplayer",
    exact: false,
    main: () => <SingleModeGame />
  },
  {
    path: "/multiplayer",
    exact: false,
    main: () => <Game />
  },
  {
    path: "/online",
    exact: false,
    main: () => <OnlineModeGame />
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
