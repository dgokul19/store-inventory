import { Fragment, useState, useEffect, useId } from "react";
import { useDispatch } from 'react-redux';

import { Close, ArrowDropDown } from '@material-ui/icons';
import { Button, TextField, Menu, MenuItem, FormControl,  Select } from '@material-ui/core';

import { DEFAULT_FIELD_TYPES } from '../Util/constants';
import { categoryActios } from '../reducer/manageCategory';

import './style/category.scss';

const CategoryType = ({ details, updateParent, itemIndex }) => {
    const dispatch = useDispatch();
    const uniqueCategoryId = useId();
    const [categoryObject, setCategoryObject] = useState({ ...details, categoryId : details.categoryId ? details.categoryId : uniqueCategoryId});
    const [openField, setOpenField] = useState();

    const addNewField = (newField) => {
        let tempFieldslist = [ ...categoryObject.categoryFields];
        tempFieldslist.push({
            label : '',
            fieldType : newField.toLowerCase()
        })
        setCategoryObject({
            ...categoryObject,
            categoryFields : tempFieldslist
        });
        setOpenField(null);

    };

    const openFieldMenu = (e) => {
        setOpenField(e.currentTarget);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryObject({
            ...categoryObject,
            [name]: value
        });
    };
    
    const handleFieldChange = (e, fieldIndex) => {
        const { name, value } = e.target;

        let tempField = [ ...categoryObject.categoryFields];
        tempField[fieldIndex][name] = value;

        setCategoryObject({
            ...categoryObject,
            categoryFields : tempField
        });
    };

    const handleCloseFields = () => {
        setOpenField(null)
    };

    const manageParentState = () => {
        updateParent(itemIndex, categoryObject);
    };

    return (
        <Fragment>
            <div className='categoryBox'>

                <h4 className="titleLabel">{categoryObject.categoryType ? categoryObject.categoryType : 'Category Type'}<Close className="closeIcon" /></h4>
                <div className="categoryDetails flexColumn gap1">
                    <div className="formElement">
                        <TextField className='customInput' 
                        label="Object Type" variant="outlined" name={`categoryType`} value={categoryObject.categoryType} 
                        onChange={handleInputChange} 
                        onBlur={manageParentState}
                        />
                    </div>
                    <div className="formElement">
                        <FormControl variant="outlined" className='customSelect'>
                            <Select
                                native
                                defaultValue={categoryObject.categoryTitle}
                                name='categoryTitle'
                                onChange={handleInputChange}
                                inputProps={{
                                    name: 'categoryTitle',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                {categoryObject.categoryFields.map((titleOption) => <option key={titleOption.label} value={titleOption.label}>{titleOption.label}</option>)}
                            </Select>
                        </FormControl>
                    </div>
                    <h4>Fields</h4>
                    {
                        categoryObject.categoryFields.map((categoryField, index) => {
                            return (
                                <div key={index.toString()} className="formElement bordered">
                                    <input placeholder={`Enter a value`} name={`label`} value={categoryField.label} onChange={(e) => handleFieldChange(e, index)}/>
                                    <select value={categoryField.fieldType} onChange={(e) => handleFieldChange(e, index)}>
                                        {DEFAULT_FIELD_TYPES.map(value => <option key={value} value={value}>{value}</option>)}
                                        <option disabled={categoryObject.categoryFields.length === 1} value={`delete`}>{`Delete`}</option>
                                    </select>
                                </div>
                            )
                        })
                    }

                    <Button className='newFieldAdd' aria-haspopup="true" onClick={openFieldMenu}>
                        Add Fields <ArrowDropDown />
                    </Button>
                    <Menu
                        anchorEl={openField}
                        keepMounted
                        open={Boolean(openField)}
                        onClose={handleCloseFields}
                    >
                        {
                            DEFAULT_FIELD_TYPES.map(value => <MenuItem className={'menuOptions'} key={value} onClick={() => addNewField(value)}>{value}</MenuItem>)
                        }
                    </Menu>
                </div>
            </div>
        </Fragment>
    );
};

export default CategoryType;