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
    <BrowserRouter basename="/Yevhenii_Kaliush_Frontend_Wroclaw">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);