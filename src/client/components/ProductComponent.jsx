import { Fragment, useState, useEffect, useId } from "react";
import { useDispatch } from 'react-redux';

import { Close, ArrowDropDown } from '@material-ui/icons';
import { Button, TextField, Menu, MenuItem, FormControl, Select } from '@material-ui/core';

import { itemActions } from '../reducer/manageItems';

import './style/category.scss';

const ProductComponent = ({ details={}, itemIndex, removeItem }) => {
    const dispatch = useDispatch();

    const [itemObject, setItemObject] = useState({ ...details });

    useEffect(() => {
        if (details.categoryType !== itemObject.categoryType) {
            setItemObject(details);
        }
    }, [details]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // setCategoryObject({
        //     ...categoryObject,
        //     [name]: value
        // });
    };

    return (
        <Fragment>
            <div className='categoryBox'>
                <h4 className="titleLabel">{itemObject?.categoryType} - {itemObject?.categoryTitle}<Close className="closeIcon" onClick={() => removeItem(itemIndex)} /></h4>
                <div className="categoryDetails flexColumn gap1">
                    {
                        itemObject?.categoryFields?.map(fields => {
                            return (
                                <div key={fields.label} className="formElement">
                                    <TextField className='customInput'
                                        label="Object Type" variant="outlined" name={`categoryType`} value={fields.label}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment >
    );
};

export default ProductComponent;