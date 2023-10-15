import { createStore, combineReducers } from 'redux';

import categoryReducer from './reducer/categoryReducer';

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  categoryList: categoryReducer
});

const persistedStore = loadFromLocalStorage();

const store = createStore(rootReducer, persistedStore);

store.subscribe(() => store.getState());
//   saveToLocalStorage(store.getState());
// });

export default store;