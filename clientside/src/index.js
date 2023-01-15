import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import UserAuthContext from './redux/AuthContext';

// import {Provider} from 'react-redux'
// import  store  from './redux/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <Provider store={store}> */}
  <UserAuthContext>
    <App />
    </UserAuthContext>
    {/* </Provider> */}
  </React.StrictMode> 
);

