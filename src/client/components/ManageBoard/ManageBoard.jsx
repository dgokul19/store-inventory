import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Add } from '@material-ui/icons';

import { categoryActions } from '../../reducer/manageCategory';
import { itemActions } from '../../reducer/manageItems';

import { CATEGORY_TYPES } from '../../Util/constants';

import Header from '../Header';

import CategoryType from './CategoryType';

import '../style/dashboard.scss';
import { useEffect } from "react";

const ManageBoard = () => {
    const dispatch = useDispatch();
    const { categoryList, isCategoryUpdated } = useSelector((state) => state.manageCategory);
    
    const createCategory = () => {
        let tempCategory = [...categoryList];
        tempCategory.push({ ...CATEGORY_TYPES });
        dispatch(categoryActions.updateCategoryList(tempCategory));
    };

    const updateParentState = (parentIndex, modifiedObject) => {
        let tempCategory = [...categoryList];
        tempCategory[parentIndex] = modifiedObject;
        dispatch(categoryActions.updateCategoryList(tempCategory));
    };
  
    const removeCategory = (parentIndex) => {
         let tempList = [...categoryList]
        tempList.splice(parentIndex, 1);
        dispatch(categoryActions.updateCategoryList(tempList));
    };

    useEffect(() => {
        dispatch(categoryActions.updateCategoryState(false));
    },[isCategoryUpdated]);

    console.log({isCategoryUpdated});
    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="bodyContainer">
                    <Add className="createIcon" onClick={createCategory}/>
                    <div className="categoryList">
                        {categoryList.map((list, index) => <CategoryType key={index.toString()} details={list} itemIndex={index} removeCategory={removeCategory} updateParent={updateParentState}/>)}
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default ManageBoard;
