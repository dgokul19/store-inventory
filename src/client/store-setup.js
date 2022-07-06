import { createStore, combineReducers } from 'redux';

import { manageCategory } from './reducer/manageCategory';
import { manageItems } from './reducer/manageItems';

export const rootReducer = combineReducers({
    manageCategory,
    manageItems
});

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state');
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const saveToLocalStorage = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

const persistedStore = loadFromLocalStorage();

const store = createStore(rootReducer, persistedStore);

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;
