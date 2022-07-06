import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Add } from '@material-ui/icons';

import { categoryActions } from '../reducer/manageCategory';

import { CATEGORY_TYPES } from '../Util/constants';

import Header from './Header';

import CategoryType from './CategoryType';

import './style/dashboard.scss';

const ManageBoard = () => {
    const dispatch = useDispatch();
    const { categoryList } = useSelector((state) => state.manageCategory);
    
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

    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="bodyContainer">
                    <Add className="createIcon" onClick={createCategory}/>
                    <div className="categoryList">
                        {categoryList.map((list, index) => <CategoryType key={index.toString()} details={list} itemIndex={index} updateParent={updateParentState}/>)}
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default ManageBoard;
