import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Close } from '@material-ui/icons';

import DashboardField from './DashboardField';

import { itemActions } from '../reducer/manageItems';


import './style/category.scss';

const ProductComponent = ({ details={}, itemIndex, removeItem, handleParentState }) => {
    const dispatch = useDispatch();
    const [itemObject, setItemObject] = useState({ ...details });
    const [stateChange, setStateChange] = useState(false);

    const handleFieldState = (fieldIndex, updateField) => {
       let categFields = [ ...itemObject.categoryFields];
       categFields[fieldIndex] = updateField;
        setItemObject({
            ...itemObject,
            categoryFields : categFields
        });
        setStateChange(true);
    };

    useEffect(() => {
                                             // Update the parent state only on state mutation
        if(stateChange) {
            updateParentState();
            setStateChange(false);
        }
                                                // Update the state on routing
        if(details.categoryType !== itemObject.categoryType){
            setItemObject(details);
        }
    },[stateChange, details]);
                                                // Function to update on storage
    const updateParentState = () => {
        handleParentState(itemIndex, itemObject);
        dispatch(itemActions.updateItem(itemObject));
    };

    return (
        <Fragment>
            <div className='categoryBox'>
                <h4 className="titleLabel">{itemObject?.categoryType} - {itemObject?.categoryTitle}<Close className="closeIcon" onClick={() => removeItem(itemIndex)} /></h4>
                <div className="categoryDetails flexColumn gap1">
                    {itemObject?.categoryFields?.map((fields, index) => <DashboardField 
                        key={index.toString()} 
                        fieldDetails={fields}
                        updateField={handleFieldState} 
                        fieldIndex={index}/>)}
                </div>
            </div>
        </Fragment >
    );
};

export default ProductComponent;