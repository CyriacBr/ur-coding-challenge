import { AuthStoreModel, authStoreModel } from "./auth.model";
import { createTypedHooks, createStore, Action, action } from "easy-peasy";
import Axios, { AxiosInstance } from "axios";

export interface Store {
  axios: AxiosInstance
  updateAxiosHeaders: Action<Store, string>;
  
  auth: AuthStoreModel
}

export const store = createStore<Store>({
  axios: Axios.create({
    baseURL: 'http://localhost:3003'
  }),
  updateAxiosHeaders: action((state, token) => {
    state.axios = Axios.create({
      baseURL: 'http://localhost:3003',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }),

  auth: authStoreModel
});

const typedHooks = createTypedHooks<Store>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;