import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { useStoreState } from "../../store";

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const loggedIn = useStoreState(state => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        rest.render ? (
          loggedIn ? (
            rest.render(props)
          ) : (
            <Redirect to="/login" />
          )
        ) : loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export { PrivateRoute };
