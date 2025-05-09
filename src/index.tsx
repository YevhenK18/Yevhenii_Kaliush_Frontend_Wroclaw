import React from 'react';
     import ReactDOM from 'react-dom/client';
     import './index.css';
     import App from './App';
     import { BrowserRouter } from 'react-router-dom';

     const redirectPath = sessionStorage.getItem('redirectPath');
     if (redirectPath && redirectPath !== '/' && window.location.pathname === '/') {
       sessionStorage.removeItem('redirectPath');
       window.history.replaceState(null, '', redirectPath);
     }

     const root = ReactDOM.createRoot(
       document.getElementById('root') as HTMLElement
     );
     root.render(
       <React.StrictMode>
         <BrowserRouter basename="/yevhenii_kaliush_frontend_wroclaw">
           <App />
         </BrowserRouter>
       </React.StrictMode>
     );