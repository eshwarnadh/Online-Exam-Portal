import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'papercss/dist/paper.min.css'
import App from './App';
import StoreProvider from './store/data'
import * as serviceWorker from './serviceWorker';
import Axios from 'axios'

window.location.href.includes("http://lochost:3000") ? Axios.defaults.baseURL = "http://localhost:5000/online-grand-test-series/us-central1/api"  : Axios.defaults.baseURL = "https://us-central1-online-grand-test-series.cloudfunctions.net/api"
console.log(Axios.defaults.baseURL)
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
