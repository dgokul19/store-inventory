import { createSlice } from '@reduxjs/toolkit';

const manageCategorySlice = createSlice({
    name: 'manageCategory',
    initialState: {
        categoryList : []
    },
    reducers: {
        updateCategoryList: (state, action) => {
            state.categoryList = [ ...action.payload ]
        }
    }
});

export const { actions: categoryActions, reducer: manageCategory } = manageCategorySlice;
