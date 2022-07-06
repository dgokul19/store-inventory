import { createSlice } from '@reduxjs/toolkit';

const manageItemsSlice = createSlice({
    name: 'manageItems',
    initialState: {
        itemList : []
    },
    reducers: {
        updateItemsList: (state, action) => {
            state.itemList = [ ...action.payload ]
        },
    }
});

export const { actions: itemActions, reducer: manageItems } = manageItemsSlice;
