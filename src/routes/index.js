import React from "react";
import CaroPage from "../pages/CaroPage/CaroPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/NotfoundPage/NotFoundPage";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <CaroPage></CaroPage>
  },
  {
    path: "/login",
    exact: false,
    main: () => <LoginPage></LoginPage>
  },
  {
    path: "/register",
    exact: false,
    main: () => <RegisterPage></RegisterPage>
  },
  {
    path: "",
    exact: false,
    main: () => <NotFoundPage></NotFoundPage>
  }
];

export default routes;
