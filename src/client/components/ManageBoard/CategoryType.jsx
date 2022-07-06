import { Fragment, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { Close, ArrowDropDown } from '@material-ui/icons';
import { Button, TextField, Menu, MenuItem, FormControl,  Select } from '@material-ui/core';

import FieldType from './ManageFieldType';

import { DEFAULT_FIELD_TYPES } from '../../Util/constants';
import { randomString } from '../../Util/helper';

import '../style/category.scss';

const CategoryType = ({ details, updateParent, itemIndex, removeCategory }) => {
    const dispatch = useDispatch();
    const uniqueCategoryId = randomString(20);
    const [categoryObject, setCategoryObject] = useState({ ...details, categoryId : details.categoryId ? details.categoryId : uniqueCategoryId});
    const [stateModify, updateStateModify] = useState(false);
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
        updateStateModify(true);
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
    
    const handleFieldChange = (fieldIndex, updatedValue) => {
        let tempFields = [ ...categoryObject.categoryFields];
        tempFields[fieldIndex] = updatedValue;
        setCategoryObject({
            ...categoryObject,
             categoryFields : tempFields
        });
        updateStateModify(true);
    };

    const handleCloseFields = () => {
        setOpenField(null)
    };

    const manageParentState = () => {
        updateParent(itemIndex, categoryObject);
    };


    useEffect(() => {
        if(stateModify){
            manageParentState();
            updateStateModify(false);
        }  
    },[stateModify]);

    return (
        <Fragment>
            <div className='categoryBox'>

                <h4 className="titleLabel">{categoryObject.categoryType ? categoryObject.categoryType : 'Category Type'}<Close className="closeIcon" onClick={() => removeCategory(itemIndex)}/></h4>
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
                        categoryObject.categoryFields.map((categoryField, index) => <FieldType key={index.toString()} fieldIndex={index} updateField={handleFieldChange} fieldDetails={categoryField}/>)
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