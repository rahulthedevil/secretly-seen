/**
 * @author Rahul Dey
 * @since 1.0
 * @type React Component
 * @description Private router components
 */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import log from "../components/helper/logger";
import LocalStorageHandler from "../components/modules/LocalStorageHandler/LocalStorageHandler";
import PopupLayout from "../components/layouts/PopupLayout"
import BackendLayout from "../components/layouts/BackendLayout"

const PrivateRoute = ({ component: Component, backend, path, ...rest }) => {
  log.info("*** PrivateRoute ***");
  console.log(backend)
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return LocalStorageHandler.getAuthenticated() ? (
          backend ?
          <BackendLayout {...props} component={Component}></BackendLayout> :
          <PopupLayout {...props} component={Component}></PopupLayout>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: path } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
