import React, { Fragment, useCallback } from "react";
import { useDispatch } from "react-redux";

// Components
import InlineSelect from "../../common/AddNewFields/InlineSelect";
import NewFieldButton from "../../common/AddNewFields/NewFieldButton";
// Util import
import { FIELDS_TYPE } from "../../common/constant";
import {
    UPDATE_CATEGORY_FIELDS,
    UPDATE_CATEGORY_FIELD_TYPE,
    ADD_CATEGORY_FIELD_TYPE
} from "../../store/action";

import classes from "./index.module.scss";

const AddCategoryBox = ({ deleteCategory, form={}}) => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target || {};
        const category = { ...form };
        category[name] = value;
        dispatch({
            type : UPDATE_CATEGORY_FIELDS,
            payload : { category : category }
        })
    };

    const handleNewFields = (newField) => {
        const category = { ...form };
        category.categoryFields.push({label : '', fieldType : newField});
        dispatch({
            type : UPDATE_CATEGORY_FIELDS,
            payload : { category : category }
        })
    };

    const handleNewFieldsInForm = (e, fieldValue, fieldIndex) => {
        const { name, value } = e.target || {};
        let updateField = { ...fieldValue };
        updateField[name] = value;
        dispatch({
            type : UPDATE_CATEGORY_FIELD_TYPE,
            payload : { 
                categoryId : form?.id, fieldIndex, updateField }
        })
    };

    const handleFieldSelection = (selectedOption, fieldValue, fieldIndex) => {
        let updateField = { ...fieldValue };
        updateField[`fieldType`] = selectedOption;
        dispatch({
            type : UPDATE_CATEGORY_FIELD_TYPE,
            payload : { categoryId : form?.id, fieldIndex, updateField }
        })
    };
    
    const renderFormFields = useCallback(() => {
        return form.categoryFields?.map((fields, index) => {
            return (
                <div key={index.toString()} className={classes.newOptionalField}>
                    <input type={'text'} name={`label`} value={fields?.label} onChange={(e) => handleNewFieldsInForm(e, fields, index)} />
                    <InlineSelect selectedValue={fields?.fieldType} options={FIELDS_TYPE} onSelection={(selected) => handleFieldSelection(selected, fields, index)} />
                </div>
            )
        })
    }, [form?.categoryFields]);

    return (
        <Fragment>
            <div className={classes.addCategoryContainer}>
                <div className={classes.categoryHeader}>
                    <label>{form.categoryName || 'New Category'}</label>
                    <i className={`fa fa-close`} onClick={() => deleteCategory(form?.id)}></i>
                </div>
                <div className={classes.categoryContent}>
                    <div className={classes.fieldType}>
                        <label>Object type</label>
                        <input name={'categoryName'} value={form.categoryName} onChange={handleChange}/>
                    </div>

                    <div className={classes.fieldType}>
                        <label>Object Title</label>
                        <select name={'categoryTitle'} value={form.categoryTitle} onChange={handleChange}>
                            {form.categoryFields?.map((fields, index) => <option key={(fields.fieldType + index)} value={fields.label}>{fields?.label}</option>)}
                        </select>
                    </div>

                    <div className={classes.fieldType}>
                        <label>Fields</label>
                        {renderFormFields()}
                    </div>

                    <NewFieldButton onSelection={handleNewFields}/>
                </div>

            </div>
        </Fragment>
    );
};

export default React.memo(AddCategoryBox);