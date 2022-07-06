import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, Chip } from '@material-ui/core';

import { itemActions } from '../reducer/manageItems';


import Header from './Header';
import ProductComponent from './ProductComponent';

import './style/dashboard.scss';
import { useEffect } from "react";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [openField, setOpenField] = useState();
    const { categoryList } = useSelector((state) => state.manageCategory);
    const { itemList } = useSelector((state) => state.manageItems);

    const items = itemList.length === 0 ? categoryList : itemList;

    const [product, setProduct] = useState(items);

    const createNewItem = (newItems) => {
        let tempList = [...product];
        tempList.push({ ...newItems });
        dispatch(itemActions.updateItemsList(tempList));
        handleCloseFields();
    };

    const removeItemfromList = (itemIndex) => {
        let tempList = [...product]
        tempList.splice(itemIndex, 1);
        dispatch(itemActions.updateItemsList(tempList));
    };

    const openFieldMenu = (e) => {
        setOpenField(e.currentTarget);
    };
    const handleCloseFields = (e) => {
        setOpenField(null);
    };


    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="bodyContainer">
                    <div className="topFilterList">
                        <div className="categoryFilters">
                            <ul className={`flex gap1`}>
                                <li> <Chip clickable label={`All`}/></li>
                                {
                                    categoryList.map((data, index) => {
                                        return (
                                        <li key={data.categoryType}>
                                            <Chip
                                                clickable
                                                label={data.categoryType}
                                            />
                                        </li>
                                        )
                                    })
                                }       
                            </ul>
                        </div>
                        <span>
                            {categoryList.length > 0 && <Button className={`customButton`} variant="contained" color="secondary" onClick={openFieldMenu}>
                                Add Items
                            </Button>}
                        </span>
                    </div>

                    <div className="categoryList">
                        {
                            itemList?.map((item, index) => <ProductComponent key={index.toString()} details={item} itemIndex={index} removeItem={removeItemfromList} />)
                        }
                    </div>
                    {categoryList.length === 0 && <Link to='/manage'><h3>Create a category !!</h3></Link>}
                </div>
            </div>
            <Menu
                anchorEl={openField}
                keepMounted
                open={Boolean(openField)}
                onClose={handleCloseFields}
            >
                {
                    categoryList.map((value, index) => <MenuItem className={'menuOptions'} key={index} onClick={() => createNewItem(value)}>{value.categoryType}</MenuItem>)
                }
            </Menu>
        </Fragment>
    )
};

export default Dashboard;
