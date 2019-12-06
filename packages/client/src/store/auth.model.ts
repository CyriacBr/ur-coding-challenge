import { Action, action, Computed, Thunk, computed, thunk } from "easy-peasy";
import { AuthDTO } from "common";
import { Store, store } from ".";
import { FetcherRef } from "react-fetcher-hooks";

export interface AuthStoreModel {
  fetcher: FetcherRef;
  userData: AuthDTO.Payload;

  token: Computed<AuthStoreModel, string>;
  loggedIn: Computed<AuthStoreModel, boolean>;

  setFetcher: Action<AuthStoreModel, FetcherRef>;
  loadAuthState: Thunk<AuthStoreModel, null, null, Store>;
  setUserData: Action<AuthStoreModel, AuthDTO.Payload>;
  setToken: Action<AuthStoreModel, string>;
  onLogIn: Thunk<AuthStoreModel, string, null, Store>;
  onLogOff: Thunk<AuthStoreModel, null, null, Store>;
}

export const authStoreModel: AuthStoreModel = {
  fetcher: null,
  userData: null,

  token: computed(state => localStorage.getItem("jwt")),
  loggedIn: computed(state => !!state.userData),

  setFetcher: action((state, fetcher) => {
    state.fetcher = fetcher;
  }),
  loadAuthState: thunk((actions, payload, { getState, getStoreState, getStoreActions }) => {
    const axios = getStoreState().axios;
    const fetcher = getState().fetcher;
    const token = getState().token;
    if (token) {
      getStoreActions().updateAxiosHeaders(token);
      let request = () => axios.post<AuthDTO.Payload>("auth/me", { token });
      return fetcher.fetch(request, payload => {
        console.log("payload :", payload);
        if (!payload) {
          actions.setUserData(null);
        } else {
          actions.setUserData(payload);
        }
      });
    } else {
      actions.setUserData(null);
    }
  }),
  setUserData: action((state, data) => {
    state.userData = data;
  }),
  setToken: action((state, token) => {
    localStorage.setItem("jwt", token);
  }),
  onLogIn: thunk((actions, token) => {
    actions.setToken(token);
  }),
  onLogOff: thunk((actions, _, { getState }) => {
    localStorage.clear();
  })
};
