import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ManageBoard from "./components/ManageBoard";

import classes from "./styles/index.module.scss";
import "./styles/App.css";
import "./styles/common.scss";

function App() {
  return (
    <Fragment>
      <BrowserRouter basename="/store-inventory">
      <Header />
        <div className={classes.wrapperContainer}>
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route exact path="/type/:categoryId" element={<Dashboard />}/>
            <Route exact path="/types" element={<ManageBoard />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
