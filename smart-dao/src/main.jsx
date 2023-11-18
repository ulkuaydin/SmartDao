
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from '../src/store.js';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Mainpage from './pages/Mainpage.jsx';
import { Provider } from 'react-redux';
import CreateDao from './pages/createDao/CreateDao.jsx';
import DaoDetail from './pages/daoDetail/daoDetail.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/shared/Header.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Header></Header>
  <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/createDao" element={<CreateDao />} />
        <Route path="/daoDetail/:id" element={<DaoDetail />} />
      </Routes>
    </Router>
  </Provider>,
)
