import { createSlice } from '@reduxjs/toolkit';

const manageCategorySlice = createSlice({
    name: 'manageCategory',
    initialState: {
        categoryList : [],
        isCategoryUpdated : false
    },
    reducers: {
        updateCategoryList: (state, action) => {
            state.isCategoryUpdated = true; 
            state.categoryList = [ ...action.payload ];
        },

        updateCategoryState : (state, action) => {
            state.isCategoryUpdated = action.payload
        }
    }
});

export const { actions: categoryActions, reducer: manageCategory } = manageCategorySlice;
