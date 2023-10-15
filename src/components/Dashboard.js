import { Fragment } from "react";

import classes from "../styles/index.module.scss";

const Dashboard = () => {
    return (
        <Fragment>
            <div className={classes.dashboardContainer}>
                <ul>
                    <li>
                        <div className={classes.newAddBtn}>
                            Add Item
                            <i className="fa fa-angle-down"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};

export default Dashboard;