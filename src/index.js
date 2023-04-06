import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store'
import { ProSidebarProvider } from 'react-pro-sidebar';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <ProSidebarProvider >
        <App />
      </ProSidebarProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
