import React, { Fragment, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

// Util import
import {
    REMOVE_NEW_PRODUCT,
    UPDATE_PRODUCT_FIELDS 
} from "../../store/action";

import classes from "./index.module.scss";

const ProductBox = ({ form={}}) => {
    const dispatch = useDispatch();

    const productTitle = useMemo(() => {
        let titleContent = form.productFields.find(li => li.label === form.productTitle);
        return `${form.categoryType} ${titleContent ? ' - '+ titleContent.value : ''}`
    },[form]);


    const handleChange = (e, fieldIndex) => {
        const { value } = e.target || {};
        const fieldsClone = [...form.productFields];
        fieldsClone[fieldIndex].value = value;
        dispatch({
            type : UPDATE_PRODUCT_FIELDS,
            payload : { productId: form?.id, fields : fieldsClone }
        })
    };

    const deleteProduct = (productId) => {
        dispatch({
            type : REMOVE_NEW_PRODUCT,
            payload : { productId : productId }
        })
    };

    const renderFormFields = useCallback(() => {
        return form.productFields?.map((fields, index) => {
            return (
                <div key={fields.label} className={classes.fieldType}>
                    <label>{fields.label}</label>
                    <div className={classes.newOptionalField}>
                        <input type={'text'} name={`label`} value={fields?.value} onChange={(e) =>handleChange(e, index)} />
                    </div>
                </div>
            )
        })
    }, [form?.productFields]);
    
    return (
        <Fragment>
            <div className={classes.addCategoryContainer}>
                <div className={classes.categoryHeader}>
                    <label>{productTitle}</label>
                    <i className={`fa fa-close`} onClick={() => deleteProduct(form?.id)}></i>
                </div>
                <div className={classes.categoryContent}>       
                    {renderFormFields()}
                </div>

            </div>
        </Fragment>
    );
};

export default React.memo(ProductBox);