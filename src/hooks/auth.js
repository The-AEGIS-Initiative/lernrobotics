import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export function ProtectedRoute({
  component: Component,
  protection_level,
  ...rest
}) {
  const appContext = useContext(AppContext);
  const user = appContext.user;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          user &&
          protection_level === "admin" &&
          appContext.user_group === "admin"
        ) {
          console.log("Admin protected route access authorized ");
          return <Component {...rest} {...props} />;
        } else if (user && protection_level === "user") {
          console.log("User protected route access authorized ");
          return <Component {...rest} {...props} />;
        } else {
          console.log("Protected route access not authorized ");
          return (
            <Redirect
              to={{
                pathname: "/unauthorized",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
