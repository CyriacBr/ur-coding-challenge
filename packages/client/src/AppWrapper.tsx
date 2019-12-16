import React from "react";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import { App } from "./App";

const AppWrapper: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

export { AppWrapper };
