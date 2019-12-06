import React from "react";
import styled from "styled-components";
import { AppBar } from "./shared/components/appBar";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./shared/components/privateRoute";
import { LoginPage } from "./pages/login/loginPage";
import { NearbyShopsPage } from "./pages/nearby-shops/nearbyShopsPage";
import { PreferredShopsPage } from "./pages/preferred-shops/preferredShopsPage";
import { RegisterPage } from "./pages/register/registerPage";

const s = {
  Container: styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
  `,
  Page: styled.div`
    flex: 1;
    height: 100%;
  `
};

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <StoreProvider store={store}>
      <s.Container>
        <AppBar />
        <s.Page>
          <Router>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <PrivateRoute exact path="/nearby" component={NearbyShopsPage} />
              <PrivateRoute
                exact
                path="/preferred"
                component={PreferredShopsPage}
              />
              <Redirect to="/nearby" />
            </Switch>
          </Router>
        </s.Page>
      </s.Container>
    </StoreProvider>
  );
};

export { App };
