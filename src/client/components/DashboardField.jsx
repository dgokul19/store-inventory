import { useState, useEffect } from "react";
import { TextField } from '@material-ui/core';

const DashboardField = ({ fieldDetails, fieldIndex, updateField }) => {
    const [fields, setFields] = useState({ ...fieldDetails });

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value
        });
    };

    useEffect(() => {
        setFields({...fieldDetails});
    },[updateField]);

    const handleParentField = () => {
        updateField(fieldIndex, fields);
    };

    return (
        <div key={fields.label} className="formElement">
            <TextField className='customInput'
                label={fields.label} variant="outlined" type={fields.fieldType} name={`value`} value={fields.value}
                onChange={handleFieldChange} onBlur={handleParentField}
            />
        </div>
    )
};

export default DashboardField;