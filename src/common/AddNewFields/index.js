import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Components
import InlineSelect from "./InlineSelect";

// Utils
import { FIELDS_TYPE } from '../constant';
import { UPDATE_CATEGORY_FIELD_TYPE } from "../../store/action";
// CSS
import classes from "./index.module.scss";

const Index = ({fieldValue, categoryId, fieldIndex}) => {

    const dispatch = useDispatch();
    const { label : value, fieldType } = fieldValue || {};

    const handleSelection = (selectedFieldType) => {
        let updateField = { ...fieldValue };
        updateField[`fieldType`] = selectedFieldType;
        dispatch({
            type : UPDATE_CATEGORY_FIELD_TYPE,
            payload : { categoryId, fieldIndex, updateField }
        })
    };

    const handleNewFieldsInForm = (e) => {
        const { name, value } = e.target || {};
        let updateField = { ...fieldValue };
        updateField[name] = value;
        dispatch({
            type : UPDATE_CATEGORY_FIELD_TYPE,
            payload : { categoryId, fieldIndex, updateField }
        })
    };

    return (
        <Fragment>
            <div className={classes.newOptionalField}>
                <input type={'text'} name = {`label`} value={value} onChange={handleNewFieldsInForm}/>
                <InlineSelect selectedValue={fieldType} options={FIELDS_TYPE} onSelection={handleSelection}/>
            </div>
        </Fragment>
    );
};

export default React.memo(Index);