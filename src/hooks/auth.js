import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

/**
 * Authentication protected route HOC
 */
export function ProtectedRoute({
  component: Component,
  protection_level,
  redirect,
  ...rest
}) {
  const appContext = useContext(AppContext);
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (appContext.isLoadingAuth) {
          console.log("Still loading auth state");
          return <h1> Loading </h1>;
        }
        if (
          !appContext.isLoadingAuth &&
          appContext.user &&
          protection_level === "admin" &&
          appContext.user_group === "admin"
        ) {
          console.log("Admin protected route access authorized ");
          return <Component {...rest} {...props} />;
        }
        if (
          !appContext.isLoadingAuth &&
          appContext.user &&
          protection_level === "user"
        ) {
          console.log("User protected route access authorized ");
          return <Component {...rest} {...props} />;
        }
        console.log("Protected route access not authorized ");
        // history.push("/unauthorized");
        if (redirect) {
          history.push(redirect);
        }
        return <h1> Unauthorized access! </h1>;
      }}
    />
  );
}
