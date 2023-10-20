import { Fragment, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import ProductBox from "./ProductBox";

// Utils
import {
    ADD_NEW_PRODUCT
} from "../store/action";

// CSS
import classes from "../styles/index.module.scss";

const Dashboard = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    const { product : originalProducts } = useSelector(state => state?.productList);
    const { category } = useSelector(state => state?.storeList);

    const productList = useMemo(() => {
        if(categoryId){          
            return originalProducts.filter(product => product?.categoryId === categoryId);
        } else {
            return originalProducts;
        }
    }, [originalProducts, categoryId]);
    const categoryFeature = useMemo(() => category.find(item => item?.id === categoryId),[category, categoryId]);

    const addNewProduct = useCallback(() => {
        const { categoryName, categoryFields, categoryTitle } = categoryFeature || {};
        dispatch({
            type: ADD_NEW_PRODUCT,
            payload : { 
                id : crypto.randomUUID(), 
                categoryId : categoryId,
                categoryType : categoryName,
                productTitle : categoryTitle,
                productFields : categoryFields.map(fields => ({
                    ...fields,
                    value : ''
                }))
            }
        })
    },[categoryFeature]);

    return (
        <Fragment>
            <div className={classes.dashboardContainer}>
                <ul>
                    {productList.map(list => (
                        <li key={list?.id}>
                            <ProductBox form={list}/>
                        </li>
                    ))}
                    {categoryId && <li>
                        <div className={classes.newAddBtn} onClick={addNewProduct}>
                            Add Item
                            {!categoryId && <i className="fa fa-angle-down"></i>}
                        </div>
                    </li>}
                </ul>
            </div>
        </Fragment>
    );
};

export default Dashboard;