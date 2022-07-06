import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Menu, MenuItem, Chip } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

import { itemActions } from '../reducer/manageItems';


import Header from './Header';
import ProductComponent from './ProductComponent';

import './style/dashboard.scss';

const Dashboard = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [activeType, setActiveType] = useState('all');
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
        if (activeType !== 'all') {
            let tempList = [...product];
            createNewItem(tempList[0]);
        } else {
            setOpenField(e.currentTarget);
        }
    };
    const handleCloseFields = (e) => {
        setOpenField(null);
    };

    useEffect(() => {
        let data = [...itemList];
        if (data.length) {
            const { categoryId } = params;

            if (categoryId) {
                data = data.filter(item => item.categoryId === categoryId);
            }
            setProduct(data);
            setActiveType(categoryId ? categoryId : 'all');
        } else {
            let tempList = [...product];
            if(tempList.length) {
                dispatch(itemActions.updateItemsList(tempList));
            }
        }

    }, [params, itemList]);

    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="bodyContainer">
                    <div className="topFilterList">
                        <div className="categoryFilters">
                            {categoryList.length > 0 && <ul className={`flex gap1`}>
                                <li className={`${activeType === 'all' ? 'active' : ''}`}>
                                    <Link to={`/`}>
                                        <Chip clickable label={`All`} />
                                    </Link>
                                </li>
                                {
                                    categoryList.map((data) => {
                                        return (
                                            <li className={activeType === data.categoryId ? 'active' : ''} key={data.categoryId}>
                                                <Link to={`/${data.categoryId}`}>
                                                    <Chip
                                                        clickable
                                                        label={data.categoryType}
                                                    />
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>}
                        </div>
                        <span>
                            {categoryList.length > 0 && (
                                <Button className={`customButton`} variant="contained" color="secondary" onClick={openFieldMenu}>
                                    Add Items {activeType === 'all' && <ArrowDropDown />}
                                </Button>
                            )
                            }
                        </span>
                    </div>

                    <div className="categoryList">
                        {
                            product.map((item, index) => <ProductComponent key={index.toString()} details={item} itemIndex={index} removeItem={removeItemfromList} />)
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
