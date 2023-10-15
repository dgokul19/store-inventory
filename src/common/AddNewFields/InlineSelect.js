import { Fragment, useRef, useState, useEffect } from "react";

// CSS
import classes from './index.module.scss';

const InlineSelect = ({ selectedValue='Small text', options, onSelection}) => {
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
            <div className={classes.fieldSelection} ref={wrapperRef}>
                <label onClick={() =>setToggleField(!toggleField)}>{selectedValue}<i className="fa fa-angle-down"></i></label>
                {toggleField && (<div className={classes.selectionBox}>
                    <ul>
                        {options?.map(list => <li key={list} onClick={() => handleSelection(list)}>{list}</li>)}
                    </ul>
                </div>)} 
            </div>
        </Fragment>
    );
};

export default InlineSelect;