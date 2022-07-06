
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './client/components/Dashboard.jsx';
import ManageBoard from './client/components/ManageBoard/ManageBoard';

import store from './client/store-setup';

import './App.css';
import './client/styles/common.scss';

function App() {
  return (
    <div className="wrapperContainer">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route path="/:categoryId" element={<Dashboard />}></Route>
            <Route path="/manage" element={<ManageBoard />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
