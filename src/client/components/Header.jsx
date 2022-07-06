import { Fragment } from "react";
import { Link } from 'react-router-dom';
import './style/header.scss';

const HeaderComponent = () => {
    return (
        <Fragment>
            <div className='headerContainer'>
                <div className="container flexVerticalCenter spaceBetween gap10">
                    <div className="logo">
                        <Link to='/'><h2>Store Inventory</h2></Link>
                    </div>

                    <div className="rightNav">
                        <Link to='/manage'> Manage Category</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


export default HeaderComponent;