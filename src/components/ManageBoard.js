import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import AddCategoryBox from "./AddCategoryBox";

// Utils
import { ADD_CATEGORY } from "../common/constant";
import { 
    ADD_NEW_CATEGORY,REMOVE_NEW_CATEGORY
} from "../store/action";

import classes from "../styles/index.module.scss";

const ManageDashboard = () => {
    const dispatch = useDispatch();

    const { category : categoryItems } = useSelector(state => state.categoryList);

    console.log({categoryItems});

    const addNewCategory = () => {
        dispatch({
            type : ADD_NEW_CATEGORY,
            payload : { categoryItem : { id: crypto.randomUUID(), ...ADD_CATEGORY }}
        })
    };

    const removeCategoryItem = (categoryId) => {
        dispatch({
            type : REMOVE_NEW_CATEGORY,
            payload : { categoryId : categoryId }
        })
    };

    
    return (
        <Fragment>
            <div className={classes.dashboardContainer}>
                <ul>
                    {categoryItems?.map(list => <li key={list?.id}><AddCategoryBox form={list} deleteCategory={removeCategoryItem}/></li>)}
                    <li className={`addNewLi`}>
                        <div className={classes.newAddBtn} onClick={() => addNewCategory()}>
                            Add Type
                        </div>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};

export default ManageDashboard;