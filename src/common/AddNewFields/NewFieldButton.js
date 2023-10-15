import { Fragment, useRef, useState, useEffect } from "react";

// Utils
import { FIELDS_TYPE } from "../constant";
// CSS
import classes from './index.module.scss';

const InlineSelect = ({onSelection}) => {
    const wrapperRef = useRef(null);
    const [toggleField, setToggleField] = useState(false);

    const handleSelection = (selection) => {
        onSelection(selection);
        setToggleField(!toggleField);
    };

    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setToggleField(false);
        }
      }

    useEffect(() => { 
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <Fragment>
            <div className={classes.newFieldButton} ref={wrapperRef}>
                <label onClick={() =>setToggleField(!toggleField)}>{'Add Field'}<i className="fa fa-angle-down"></i></label>
                {toggleField && (<div className={classes.selectionBox}>
                    <ul>
                        {FIELDS_TYPE?.map(list => <li key={list} onClick={() => handleSelection(list)}>{list}</li>)}
                    </ul>
                </div>)} 
            </div>
        </Fragment>
    );
};

export default InlineSelect;