import { FetcherRef } from "react-fetcher-hooks";
import { IShop } from "common";
import { Computed, Action, Thunk, computed, action, thunk } from "easy-peasy";
import { Store } from ".";

export type FilterType = 'all' | 'liked' | 'nearby';

export interface ShopStoreModel {
  fetcher: FetcherRef;
  items: IShop[];
  filterType: FilterType;

  setFetcher: Action<ShopStoreModel, FetcherRef>;
  set: Action<ShopStoreModel, IShop[]>;
  add: Action<ShopStoreModel, IShop>;
  remove: Action<ShopStoreModel, IShop>;                            
  setFilterType: Action<ShopStoreModel, FilterType>;
  loadItems: Thunk<ShopStoreModel, FilterType, void, Store>;
  likeItem: Thunk<ShopStoreModel, IShop, void, Store>;
  unlikeItem: Thunk<ShopStoreModel, IShop, void, Store>;
  dislikeItem: Thunk<ShopStoreModel, IShop, void, Store>;
}

export const shopStoreModel: ShopStoreModel = {
  fetcher: null,
  items: [],
  filterType: 'all',

  setFetcher: action((state, fetcher) => {
    state.fetcher = fetcher;
  }),
  set: action((state, items) => {
    state.items = items;
  }),
  add: action((state, item) => {
    state.items.push(item);
  }),
  remove: action((state, item) => {
    state.items = state.items.filter(v => v.id !== item.id);
  }),
  setFilterType: action((state, type) => {
    state.filterType = type;
  }),
  loadItems: thunk(
    (actions, type, { getState, getStoreState }) => {
      const axios = getStoreState().axios;
      const fetcher = getState().fetcher;
      const request = () =>
        axios.get<IShop[]>(
          type === "all"
            ? "shops"
            : type === "liked"
            ? "shops/liked"
            : "shops/nearby"
        );
      return fetcher.fetch(request, data => {
        actions.setFilterType(type);
        actions.set(data);
      });
    }
  ),
  likeItem: thunk((actions, item, { getState, getStoreState}) => {
    const axios = getStoreState().axios;
    const fetcher = getState().fetcher;
    const request = () => axios.post<IShop>(`shops/${item.id}/like`);
    return fetcher.fetch(request, item => {
      actions.set(getState().items.map(v => v.id === item.id ? item : v));
    });
  }),
  unlikeItem: thunk((actions, item, { getState, getStoreState}) => {
    const axios = getStoreState().axios;
    const fetcher = getState().fetcher;
    const request = () => axios.post<IShop>(`shops/${item.id}/unlike`);
    return fetcher.fetch(request, item => {
      /**
       * if the current view is 'liked shops', remove the unliked item
       * from the store
       */
      if (getState().filterType === 'liked') {
        actions.remove(item);
      } else {
        actions.set(getState().items.map(v => v.id === item.id ? item : v));
      }
    });
  }),
  dislikeItem: thunk((actions, item, { getState, getStoreState}) => {
    const axios = getStoreState().axios;
    const fetcher = getState().fetcher;
    const request = () => axios.post<IShop>(`shops/${item.id}/dislike`);
    return fetcher.fetch(request, item => {
      actions.remove(item);
    });
  })
};
