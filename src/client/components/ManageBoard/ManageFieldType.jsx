import { useState, useEffect } from "react";
import { DEFAULT_FIELD_TYPES } from '../../Util/constants';

const FieldType = ({fieldDetails, fieldIndex, updateField}) => {
    const [ fieldValue, setFieldValue ] = useState({...fieldDetails});

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFieldValue({
            ...fieldValue,
            [name] : value
        });
    };
    
    useEffect(() => {
        if(fieldDetails.fieldType !== fieldValue.fieldType) {
            handleParentField();
        }
    },[fieldValue.fieldType]);

    const handleParentField = () => {
        updateField(fieldIndex, fieldValue);
    }; 

    return (
        <div className="formElement bordered">
            <input placeholder={`Enter a value`} name={`label`} value={fieldValue.label} onChange={handleFieldChange} onBlur={handleParentField}/>
            <select value={fieldValue.fieldType} name={`fieldType`} onChange={handleFieldChange}>
                {DEFAULT_FIELD_TYPES.map(value => <option key={value} value={value}>{value}</option>)}
                <option value={`delete`}>{`Delete`}</option>
            </select>
        </div>
    )
};

export default FieldType;