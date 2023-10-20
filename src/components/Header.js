import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import classes from "../styles/index.module.scss";
import { useSelector } from "react-redux";

const Header = () => {
    const { category } = useSelector(state => state?.storeList);
    const getActiveClass= ({ isActive }) => {
        return isActive ? 'activeMenu' : null;
    };

    return (
        <Fragment>
            <div className={classes.headerContainer}>
                <h3>Store Inventory</h3>
                <ul>
                    <li><NavLink to="/" preventScrollReset={true} className={getActiveClass}>All</NavLink></li>
                    {category?.map(list => <li key={list?.id}><NavLink to={`/type/${list?.id}`} preventScrollReset={true} className={getActiveClass}>{list?.categoryName}</NavLink></li>)}
                    <li><NavLink to="/types" preventScrollReset={true} className={getActiveClass}>Manage Types</NavLink></li>
                </ul>
            </div>
        </Fragment>
    )
};

export default Header;