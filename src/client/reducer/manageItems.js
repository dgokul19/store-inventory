import { createSlice } from '@reduxjs/toolkit';

const manageItemsSlice = createSlice({
    name: 'manageItems',
    initialState: {
        itemList : [],
        isUpdated : false
    },
    reducers: {
        updateItemsList: (state, action) => {
            state.isUpdated = true;
            state.itemList = [ ...action.payload ];
        },
        updateItemFromCategory: (state, action) => {
            state.isUpdated = true;
            state.itemList = [ ...action.itemList, ...action.payload ];
        },
        updateItem: (state, action) => {
            let tempState  = [...state.itemList];
            let modifiedIndex = tempState.findIndex(val => val.categoryId === action.payload.categoryId)
            tempState[modifiedIndex] = action.payload;
            state.itemList = [ ...tempState]
        },
        updateReducerState: (state, action) => {
            state.isUpdated = action.payload;
        }
    }
});

export const { actions: itemActions, reducer: manageItems } = manageItemsSlice;
