import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from './redux/store';
import { Provider } from "react-redux";
import { StateContext } from './context/StateContext';
import './index.css';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store= {store}>
        <BrowserRouter>
          <StateContext>
            <ToastContainer/>
            <App />       
          </StateContext> 
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);