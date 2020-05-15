import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export function ProtectedRoute({
  component: Component,
  protection_level,
  ...rest
}) {
  const appContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!appContext.isAuth) {
      checkAuthStatus();
    }
    async function checkAuthStatus() {
      return await appContext.setAuth();
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          appContext.user &&
          protection_level === "admin" &&
          appContext.user_group === "admin"
        ) {
          console.log("Admin protected route access authorized ");
          return <Component {...rest} {...props} />;
        } else if (appContext.user && protection_level === "user") {
          console.log("User protected route access authorized ");
          return <Component {...rest} {...props} />;
        } else {
          console.log("Protected route access not authorized ");
          //history.push("/unauthorized");
          return <h1> Unauthorized access! </h1>;
        }
      }}
    />
  );
}
