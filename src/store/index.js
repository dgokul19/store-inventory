import { createStore, combineReducers } from 'redux';

import storeReducer from './reducer/storeReducer';
import productReducer from './reducer/productReducer';

const saveToLocalStorage = (state) => {
  try {
    sessionStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = sessionStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  storeList: storeReducer,
  productList : productReducer
});

const persistedStore = loadFromLocalStorage();

const store = createStore(rootReducer, persistedStore);

// store.subscribe(() => {
//   saveToLocalStorage(store.getState());
// });

store.subscribe(() => store.getState());

export default store;