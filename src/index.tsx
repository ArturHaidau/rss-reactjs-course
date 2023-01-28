import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import './index.css';
import { APP_ROOT_ID } from './application.constants';

ReactDOM.createRoot(document.getElementById(APP_ROOT_ID) as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
