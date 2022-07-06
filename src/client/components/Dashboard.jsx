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

    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    const createNewItem = (newItems) => {
        let tempList = [...itemList];
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
            if (!tempList.length) {
                let findType = categoryList.find(val => val.categoryId === activeType);
                createNewItem(findType);
            } else {
                createNewItem(tempList[0]);
            }

        } else {
            setOpenField(e.currentTarget);
        }
    };

    const updateParentState = (itemIndex, updatedValue) => {
        let tempList = [...product];
        tempList[itemIndex] = updatedValue;
        setProduct(tempList);
    };

    const handleCloseFields = (e) => {
        setOpenField(null);
    };


    useEffect(() => {
        if (itemList.length === 0) {
            if (categoryList.length) {
                setCategory(categoryList);
                setProduct(categoryList);
                dispatch(itemActions.updateItemsList(categoryList));
            }
        } else {
            if (!params.categoryId) {
                // let productList = [...product];
                // productList.forEach(list => {
                //     let existObject = categoryList.find(val => val.categoryId !== list.categoryId);
                //     if (existObject) {
                //         productList.push(existObject);
                //         setProduct(productList);
                //         dispatch(itemActions.updateItemsList(productList));
                //     }
                // });
                setProduct(itemList);
            }
        }
        if (category.length === 0) {
            setCategory(categoryList);
        }
    }, [itemList, categoryList]);

    useEffect(() => {
        const { categoryId } = params;
        let data = [...itemList];
        if (categoryId) {
            if (categoryId !== 'all') {
                data = data.filter(item => item.categoryId === categoryId);
            }
            console.log('filtered', data);
            setProduct(data);
        } else {
            setProduct(data);
        }
        setActiveType(categoryId ? categoryId : 'all');
    }, [params]);

    // console.log('product', product);

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
                            product?.map((item, index) => <ProductComponent
                                key={index.toString()}
                                details={item}
                                itemIndex={index}
                                handleParentState={updateParentState}
                                removeItem={removeItemfromList} />)
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
