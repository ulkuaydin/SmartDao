
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from '../src/store.js';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Mainpage from './pages/Mainpage.jsx';
import { Provider } from 'react-redux';

const router = createBrowserRouter([{
  path:"/",
  element:  <App />,
  children:[
    {
      path:"/",
      element:<Mainpage/>
    },
    {

    }

  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<RouterProvider router={router} >
  </RouterProvider>
  </Provider>,
)